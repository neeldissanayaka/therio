import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Film, Gamepad2, Sparkles, ArrowRight, Minus, Plus } from 'lucide-react';
import { PACKAGES, TIME_SLOTS, ADDONS } from '../data/packagesData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: 'movie' | 'ps5';
  onProceedToPayment: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialPackageId = 'movie', onProceedToPayment }) => {
  const [selectedPackage, setSelectedPackage] = useState<'movie' | 'ps5'>(initialPackageId);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0].id);
  const [extraPax, setExtraPax] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialNote, setSpecialNote] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [customer, setCustomer] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedPackage(initialPackageId);
      setIsBooked(false);
      setBookingRef('');
    }
  }, [isOpen, initialPackageId]);

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[0];
  const slotObj = TIME_SLOTS.find((s) => s.id === selectedSlot) || TIME_SLOTS[0];
  const addonsPrice = selectedAddons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.priceLKR || 0), 0);
  const totalPrice = currentPkg.priceLKR + extraPax * 1000 + addonsPrice;

  const toggleAddon = (id: string) => setSelectedAddons((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': globalThis.crypto?.randomUUID?.() ?? String(Date.now()) },
        body: JSON.stringify({ packageId: selectedPackage, date: selectedDate, slotId: selectedSlot, guests: currentPkg.paxIncluded + extraPax, addonIds: selectedAddons, specialNote, ...customer })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to create booking');
      setBookingRef(data.bookingRef);
      setIsBooked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create booking');
    } finally { setIsSubmitting(false); }
  };

  const close = () => { setIsBooked(false); onClose(); };

  return (
    <div className="booking-v18-backdrop" role="dialog" aria-modal="true" aria-label="Reserve your experience">
      <div className="booking-v18-modal">
        <header className="booking-v18-head">
          <div>
            <span>THE RIO / RESERVATION</span>
            <h2>{isBooked ? 'Your scene is locked.' : 'Build your session.'}</h2>
          </div>
          <button onClick={close} className="booking-v18-close" aria-label="Close booking"><X /></button>
        </header>

        {isBooked ? (
          <div className="booking-v18-confirm">
            <div className="booking-v18-confirm-icon"><CheckCircle2 /></div>
            <span>CONFIRMATION {bookingRef}</span>
            <h3>Ready when you are.</h3>
            <p>Your private {currentPkg.category.toLowerCase()} session is staged as a demo reservation.</p>
            <div className="booking-v18-ticket">
              <div><span>EXPERIENCE</span><b>{currentPkg.category}</b></div>
              <div><span>DATE</span><b>{selectedDate}</b></div>
              <div><span>TIME</span><b>{slotObj.time}</b></div>
              <div><span>GUESTS</span><b>{currentPkg.paxIncluded + extraPax}</b></div>
              <div className="wide"><span>TOTAL</span><b>Rs. {totalPrice.toLocaleString()}</b></div>
            </div>
            <div className="flex gap-3">
              <button className="booking-v18-primary flex-1" onClick={close}>Done <ArrowRight /></button>
              <button className="booking-v18-primary flex-1" onClick={() => { close(); window.location.assign(`/payment.html?booking=${encodeURIComponent(bookingRef)}`); }}>Proceed to payment <ArrowRight /></button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="booking-v18-body">
            <div className="booking-v18-step"><span>01</span><div><small>CHOOSE YOUR SCENE</small><h3>What are we playing?</h3></div></div>
            <div className="booking-v18-package-grid">
              {PACKAGES.map((pkg) => {
                const selected = pkg.id === selectedPackage;
                const Icon = pkg.id === 'movie' ? Film : Gamepad2;
                return <button type="button" key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} className={`booking-v18-package ${selected ? 'is-selected' : ''}`}>
                  <div className="booking-v18-package-icon"><Icon /></div>
                  <div><span>{pkg.category}</span><b>{pkg.title}</b><small>{pkg.duration} · up to {pkg.paxIncluded} guests</small></div>
                  <strong>Rs. {pkg.priceLKR.toLocaleString()}</strong>
                </button>;
              })}
            </div>

            <div className="booking-v18-step"><span>02</span><div><small>SET THE MOMENT</small><h3>When should it happen?</h3></div></div>
            <div className="booking-v18-fields">
              <label><span><Calendar /> DATE</span><input type="date" value={selectedDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setSelectedDate(e.target.value)} required /></label>
              <label><span><Clock /> TIME</span><select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>{TIME_SLOTS.map((slot) => <option key={slot.id} value={slot.id}>{slot.time} · {slot.label}</option>)}</select></label>
            </div>

            <div className="booking-v18-step"><span>03</span><div><small>SIZE THE SQUAD</small><h3>How many are coming?</h3></div><b className="booking-v18-total-pax">{currentPkg.paxIncluded + extraPax} GUESTS</b></div>
            <div className="booking-v18-counter">
              <button type="button" onClick={() => setExtraPax(Math.max(0, extraPax - 1))}><Minus /></button>
              <div><strong>{currentPkg.paxIncluded + extraPax}</strong><span>guests</span></div>
              <button type="button" onClick={() => setExtraPax(Math.min(3, extraPax + 1))}><Plus /></button>
            </div>

            <div className="booking-v18-step"><span>04</span><div><small>OPTIONAL</small><h3>Add a little extra.</h3></div></div>
            <div className="booking-v18-addons">
              {ADDONS.map((addon) => {
                const selected = selectedAddons.includes(addon.id);
                return <button type="button" key={addon.id} onClick={() => toggleAddon(addon.id)} className={selected ? 'is-selected' : ''}><span><Sparkles />{addon.name}</span><b>+Rs. {addon.priceLKR.toLocaleString()}</b></button>;
              })}
            </div>

            <label className="booking-v18-note"><span>FINAL NOTE · OPTIONAL</span><textarea rows={3} maxLength={500} value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} placeholder="Movie title, game choice, birthday idea, anything that sets the mood..." /></label>

            <div className="booking-v18-step"><span>05</span><div><small>YOUR DETAILS</small><h3>Where should we send confirmation?</h3></div></div>
            <div className="booking-v18-fields">
              <label><span>FIRST NAME</span><input required maxLength={80} value={customer.firstName} onChange={e => setCustomer({...customer, firstName: e.target.value})} /></label>
              <label><span>LAST NAME</span><input required maxLength={80} value={customer.lastName} onChange={e => setCustomer({...customer, lastName: e.target.value})} /></label>
              <label><span>EMAIL</span><input required type="email" maxLength={254} value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})} /></label>
              <label><span>PHONE</span><input required type="tel" maxLength={30} value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} /></label>
            </div>
            {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

            <div className="booking-v18-summary">
              <div><span>ESTIMATED TOTAL</span><strong>Rs. {totalPrice.toLocaleString()}</strong></div>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Reserve this scene'} <ArrowRight /></button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
