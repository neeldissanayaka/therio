import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import auth from './server/src/routes/auth.js';
import bookings from './server/src/routes/bookings.js';
import payments from './server/src/routes/payments.js';
import { sameOrigin, apiSecurityHeaders } from './server/src/middleware/security.js';
import { sanitizeInputs } from './server/src/middleware/sanitize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const origin = process.env.PUBLIC_ORIGIN;

  // 1. Core Process & Network Hardening
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // 2. Comprehensive Security Headers with Helmet (configured for preview iframe compatibility)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'https:', 'data:', 'blob:'],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://sandbox.payhere.lk', 'https://www.payhere.lk'],
          scriptSrcAttr: ["'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
          mediaSrc: ["'self'", 'data:', 'blob:', 'https:'],
          connectSrc: [
            "'self'",
            'https:',
            'wss:',
            'ws:',
            'https://sandbox.payhere.lk',
            'https://www.payhere.lk',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
          ],
          frameSrc: ["'self'", 'https://sandbox.payhere.lk', 'https://www.payhere.lk', 'https:', 'data:'],
          frameAncestors: null, // Allow embedding in AI Studio preview iframe
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'", 'https://sandbox.payhere.lk', 'https://www.payhere.lk'],
          upgradeInsecureRequests: null,
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      xFrameOptions: false, // Disabled so AI Studio iframe can render the preview
      xContentTypeOptions: true,
      xDnsPrefetchControl: { allow: false },
      xDownloadOptions: true,
      xPermittedCrossDomainPolicies: { permittedPolicies: 'none' },
    })
  );

  // Custom Permissions Policy & Anti-MIME Sniffing
  app.use((_req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self "https://sandbox.payhere.lk" "https://www.payhere.lk")'
    );
    next();
  });

  // 3. Compression & Cookie Parser
  app.use(compression());
  app.use(cookieParser());

  // 4. Strict CORS Configuration
  app.use(
    cors({
      origin: origin ? [origin] : true,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Idempotency-Key', 'Authorization'],
      maxAge: 86400,
    })
  );

  // 5. Strict Payload Size Limits to Prevent DoS
  app.use(express.urlencoded({ extended: false, limit: '15kb', type: 'application/x-www-form-urlencoded' }));
  app.use(express.json({ limit: '15kb' }));

  // 6. Global Input Sanitization (Recursive XSS/Injection Filter)
  app.use(sanitizeInputs);

  // 7. CSRF / Origin Validation on Mutating Requests
  app.use(sameOrigin);

  // 8. Tiered Rate Limiters
  const globalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' },
  });

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 15,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many login attempts. Please wait 15 minutes before trying again.' },
  });

  const bookingCreationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many booking reservations created from this IP.' },
  });

  const paymentNotifyLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
  });

  // 9. API Routes with Security Headers & Rate Limits
  app.use('/api', apiSecurityHeaders);
  app.use('/api', globalApiLimiter);
  app.use('/api/auth/login', loginLimiter);
  app.use('/api/bookings', (req, res, next) => {
    if (req.method === 'POST') return bookingCreationLimiter(req, res, next);
    next();
  });
  app.use('/api/payments/payhere/notify', paymentNotifyLimiter);

  app.get('/api/health', (_req, res) => res.json({ ok: true, status: 'operational', timestamp: new Date().toISOString() }));
  app.use('/api/auth', auth);
  app.use('/api/bookings', bookings);
  app.use('/api/payments', payments);

  // 10. Multi-Page SPA / Static Routing
  // Clean routing for /packages, /gaming, /about, /testimonials, /contact, /booking, /payment, /admin
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // Handle HTML aliases
    app.get('/booking', (_req, res) => res.sendFile(path.join(distPath, 'booking.html')));
    app.get('/payment', (_req, res) => res.sendFile(path.join(distPath, 'payment.html')));
    app.get('/admin', (_req, res) => res.sendFile(path.join(distPath, 'admin.html')));

    // SPA fallback for all sub-pages (/packages, /gaming, /about, etc.)
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 11. Centralized Safe Error Handling Middleware (prevents information leakage)
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled request error:', err?.message || err);
    if (res.headersSent) return;
    res.status(err?.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal server request failure' : (err?.message || 'Server error'),
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Rio Multi-Page Security Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
