import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import auth from './routes/auth.js';
import bookings from './routes/bookings.js';
import payments from './routes/payments.js';
import { sameOrigin } from './middleware/security.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const origin = process.env.PUBLIC_ORIGIN;
if (process.env.NODE_ENV === 'production' && !origin) throw new Error('PUBLIC_ORIGIN is required in production');

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(pinoHttp());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cookieParser());
app.use(cors({ origin: origin || true, credentials: true, methods: ['GET','POST','PATCH','OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.urlencoded({ extended: false, limit: '20kb', type: 'application/x-www-form-urlencoded' }));
app.use(express.json({ limit: '20kb' }));
app.use(sameOrigin);

const publicLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: 'draft-8', legacyHeaders: false });
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-8', legacyHeaders: false, message: { error: 'Too many login attempts' } });
app.use('/api/auth/login', loginLimiter);
app.use('/api/bookings', publicLimiter);
app.use('/api/payments', publicLimiter);
app.get('/api/health', (_req,res)=>res.json({ok:true}));
app.use('/api/auth', auth);
app.use('/api/bookings', bookings);
app.use('/api/payments', payments);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '../../dist');
app.use(express.static(webRoot, { index: 'index.html', maxAge: '1h' }));
app.get(/.*/, (_req,res)=>res.sendFile(path.join(webRoot, 'index.html')));

app.listen(port, () => console.log(`The Rio API listening on ${port}`));
