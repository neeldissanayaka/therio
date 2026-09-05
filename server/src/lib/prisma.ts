import bcrypt from 'bcryptjs';

export interface BookingRecord {
  id: string;
  publicRef: string;
  idempotencyKey: string;
  packageId: string;
  packageTitle: string;
  bookingDate: Date;
  slotId: string;
  slotLabel: string;
  activeSlotKey: string | null;
  paymentExpiresAt: Date | null;
  guests: number;
  addonIds: string[];
  specialNote?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalLkr: number;
  currency: string;
  status: 'PENDING_PAYMENT' | 'PAID' | 'PAYMENT_FAILED' | 'CANCELLED' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
  payment?: PaymentRecord | null;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  payhereId?: string | null;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'CHARGEDBACK';
  method?: string | null;
  statusMessage?: string | null;
  rawStatus?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-Memory Database Store for AI Studio environment
class InMemoryDatabase {
  bookings: Map<string, BookingRecord> = new Map();
  payments: Map<string, PaymentRecord> = new Map();
  adminUsers: Map<string, AdminUserRecord> = new Map();

  constructor() {
    this.seedDefaultAdmin();
  }

  private seedDefaultAdmin() {
    const email = (process.env.ADMIN_EMAIL || 'admin@therio.lk').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
    const passwordHash = bcrypt.hashSync(password, 10);
    const adminId = 'admin_default_01';
    this.adminUsers.set(email, {
      id: adminId,
      email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  booking = {
    findUnique: async ({ where }: { where: { idempotencyKey?: string; activeSlotKey?: string; publicRef?: string; id?: string } }): Promise<BookingRecord | null> => {
      for (const b of this.bookings.values()) {
        if (where.id && b.id === where.id) return this.enrichBooking(b);
        if (where.idempotencyKey && b.idempotencyKey === where.idempotencyKey) return this.enrichBooking(b);
        if (where.activeSlotKey && b.activeSlotKey === where.activeSlotKey) return this.enrichBooking(b);
        if (where.publicRef && b.publicRef === where.publicRef) return this.enrichBooking(b);
      }
      return null;
    },

    findMany: async ({ orderBy, skip = 0, take = 50, include }: { orderBy?: { createdAt?: 'asc' | 'desc' }; skip?: number; take?: number; include?: { payment?: boolean } } = {}): Promise<BookingRecord[]> => {
      let list = Array.from(this.bookings.values());
      if (orderBy?.createdAt === 'desc') {
        list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      } else if (orderBy?.createdAt === 'asc') {
        list.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      }
      list = list.slice(skip, skip + take);
      return list.map(b => this.enrichBooking(b));
    },

    count: async (): Promise<number> => {
      return this.bookings.size;
    },

    create: async ({ data }: { data: any }): Promise<BookingRecord> => {
      const id = 'book_' + Math.random().toString(36).substring(2, 12);
      const record: BookingRecord = {
        id,
        publicRef: data.publicRef,
        idempotencyKey: data.idempotencyKey,
        packageId: data.packageId,
        packageTitle: data.packageTitle,
        bookingDate: data.bookingDate instanceof Date ? data.bookingDate : new Date(data.bookingDate),
        slotId: data.slotId,
        slotLabel: data.slotLabel,
        activeSlotKey: data.activeSlotKey ?? null,
        paymentExpiresAt: data.paymentExpiresAt ? (data.paymentExpiresAt instanceof Date ? data.paymentExpiresAt : new Date(data.paymentExpiresAt)) : null,
        guests: data.guests,
        addonIds: Array.isArray(data.addonIds) ? data.addonIds : [],
        specialNote: data.specialNote ?? null,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        totalLkr: data.totalLkr,
        currency: data.currency || 'LKR',
        status: data.status || 'PENDING_PAYMENT',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.bookings.set(id, record);
      return this.enrichBooking(record);
    },

    update: async ({ where, data }: { where: { publicRef?: string; id?: string }; data: any }): Promise<BookingRecord> => {
      let target: BookingRecord | null = null;
      for (const b of this.bookings.values()) {
        if (where.id && b.id === where.id) { target = b; break; }
        if (where.publicRef && b.publicRef === where.publicRef) { target = b; break; }
      }
      if (!target) throw new Error('Booking not found');
      if (data.status !== undefined) target.status = data.status;
      if (data.activeSlotKey !== undefined) target.activeSlotKey = data.activeSlotKey;
      target.updatedAt = new Date();
      return this.enrichBooking(target);
    },

    updateMany: async ({ where, data }: { where: { status?: string; paymentExpiresAt?: { lt?: Date } }; data: any }) => {
      let count = 0;
      const now = new Date();
      for (const b of this.bookings.values()) {
        let match = true;
        if (where.status && b.status !== where.status) match = false;
        if (where.paymentExpiresAt?.lt && b.paymentExpiresAt && b.paymentExpiresAt >= where.paymentExpiresAt.lt) match = false;
        if (match) {
          if (data.status !== undefined) b.status = data.status;
          if (data.activeSlotKey !== undefined) b.activeSlotKey = data.activeSlotKey;
          b.updatedAt = now;
          count++;
        }
      }
      return { count };
    }
  };

  payment = {
    findUnique: async ({ where }: { where: { bookingId?: string; id?: string; payhereId?: string } }): Promise<PaymentRecord | null> => {
      for (const p of this.payments.values()) {
        if (where.id && p.id === where.id) return p;
        if (where.bookingId && p.bookingId === where.bookingId) return p;
        if (where.payhereId && p.payhereId === where.payhereId) return p;
      }
      return null;
    },

    upsert: async ({ where, update, create }: { where: { bookingId: string }; update: any; create: any }): Promise<PaymentRecord> => {
      let existing: PaymentRecord | null = null;
      for (const p of this.payments.values()) {
        if (p.bookingId === where.bookingId) {
          existing = p;
          break;
        }
      }
      if (existing) {
        Object.assign(existing, update, { updatedAt: new Date() });
        return existing;
      } else {
        const id = 'pay_' + Math.random().toString(36).substring(2, 12);
        const record: PaymentRecord = {
          id,
          bookingId: create.bookingId,
          payhereId: create.payhereId ?? null,
          amount: create.amount,
          currency: create.currency || 'LKR',
          status: create.status || 'PENDING',
          method: create.method ?? null,
          statusMessage: create.statusMessage ?? null,
          rawStatus: create.rawStatus ?? null,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.payments.set(id, record);
        return record;
      }
    }
  };

  adminUser = {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }): Promise<AdminUserRecord | null> => {
      if (where.email) {
        const admin = this.adminUsers.get(where.email.toLowerCase());
        return admin || null;
      }
      for (const a of this.adminUsers.values()) {
        if (where.id && a.id === where.id) return a;
      }
      return null;
    },

    upsert: async ({ where, update, create }: { where: { email: string }; update: any; create: any }): Promise<AdminUserRecord> => {
      const email = where.email.toLowerCase();
      const existing = this.adminUsers.get(email);
      if (existing) {
        Object.assign(existing, update, { updatedAt: new Date() });
        return existing;
      }
      const record: AdminUserRecord = {
        id: 'admin_' + Math.random().toString(36).substring(2, 12),
        email,
        passwordHash: create.passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.adminUsers.set(email, record);
      return record;
    }
  };

  async $transaction<T>(arg: any): Promise<any> {
    if (Array.isArray(arg)) {
      return Promise.all(arg);
    }
    if (typeof arg === 'function') {
      return arg(this);
    }
    return arg;
  }

  async $disconnect(): Promise<void> {}

  private enrichBooking(b: BookingRecord): BookingRecord {
    let payment: PaymentRecord | null = null;
    for (const p of this.payments.values()) {
      if (p.bookingId === b.id) { payment = p; break; }
    }
    return { ...b, payment };
  }
}

export const prisma = new InMemoryDatabase() as any;
