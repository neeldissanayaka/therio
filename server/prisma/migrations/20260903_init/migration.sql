-- The Rio initial PostgreSQL schema
CREATE TYPE "BookingStatus" AS ENUM ('PENDING_PAYMENT','PAID','PAYMENT_FAILED','CANCELLED','COMPLETED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING','SUCCESS','FAILED','CANCELLED','CHARGEDBACK');

CREATE TABLE "Booking" (
  "id" TEXT NOT NULL,
  "publicRef" TEXT NOT NULL,
  "idempotencyKey" TEXT NOT NULL,
  "packageId" TEXT NOT NULL,
  "packageTitle" TEXT NOT NULL,
  "bookingDate" DATE NOT NULL,
  "slotId" TEXT NOT NULL,
  "slotLabel" TEXT NOT NULL,
  "activeSlotKey" TEXT,
  "paymentExpiresAt" TIMESTAMP(3),
  "guests" INTEGER NOT NULL,
  "addonIds" JSONB NOT NULL,
  "specialNote" VARCHAR(500),
  "firstName" VARCHAR(80) NOT NULL,
  "lastName" VARCHAR(80) NOT NULL,
  "email" VARCHAR(254) NOT NULL,
  "phone" VARCHAR(30) NOT NULL,
  "totalLkr" INTEGER NOT NULL,
  "currency" CHAR(3) NOT NULL DEFAULT 'LKR',
  "status" "BookingStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "Booking_publicRef_key" ON "Booking"("publicRef");
CREATE UNIQUE INDEX "Booking_idempotencyKey_key" ON "Booking"("idempotencyKey");
CREATE UNIQUE INDEX "Booking_activeSlotKey_key" ON "Booking"("activeSlotKey");
CREATE INDEX "Booking_bookingDate_slotId_idx" ON "Booking"("bookingDate","slotId");

CREATE TABLE "Payment" (
  "id" TEXT NOT NULL,
  "bookingId" TEXT NOT NULL,
  "payhereId" TEXT,
  "amount" INTEGER NOT NULL,
  "currency" CHAR(3) NOT NULL,
  "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "method" TEXT,
  "statusMessage" TEXT,
  "rawStatus" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");
CREATE UNIQUE INDEX "Payment_payhereId_key" ON "Payment"("payhereId");
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
