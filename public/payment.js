const params = new URLSearchParams(window.location.search);
const ref = params.get('booking');
const result = params.get('result');
const summary = document.getElementById('summary');
const statusPill = document.getElementById('status-pill');
const payButton = document.getElementById('pay-btn');
const message = document.getElementById('message');
const form = document.getElementById('payhere');

const ADDON_NAMES = {
  'popcorn-combo': 'Jumbo Popcorn & Dip Combo',
  'beverage-bucket': 'Chilled Soda & Mocktail Bucket',
  'celebration-decor': 'Birthday / Anniversary Deco & Cake Setup',
  'extra-hour': 'Extra 1 Hour Extension'
};

function setStatus(value) {
  statusPill.textContent = value.replaceAll('_', ' ');
  statusPill.className = 'status-pill ' + (value === 'PAID' ? 'paid' : 'pending');
}

function addRow(label, value, total = false) {
  const row = document.createElement('div');
  row.className = 'row' + (total ? ' total' : '');
  const a = document.createElement('span'); a.textContent = label;
  const b = document.createElement('strong'); b.textContent = value;
  row.append(a, b); summary.appendChild(row);
}

function showBooking(booking) {
  summary.replaceChildren();
  addRow('Booking', booking.publicRef);
  addRow('Experience', booking.packageTitle);
  addRow('Date', new Date(booking.bookingDate).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric', timeZone:'UTC' }));
  addRow('Session', booking.slotLabel);
  addRow('Guests', String(booking.guests));
  if (Array.isArray(booking.addonIds) && booking.addonIds.length) {
    addRow('Add-ons', booking.addonIds.map(id => ADDON_NAMES[id] || id).join(', '));
  }
  addRow('Total', `${booking.currency || 'LKR'} ${Number(booking.totalLkr).toLocaleString()}`, true);
  setStatus(booking.status);
  if (booking.status === 'PAID') {
    payButton.disabled = true;
    payButton.textContent = 'Payment confirmed';
  } else if (booking.status !== 'PENDING_PAYMENT') {
    payButton.disabled = true;
    payButton.textContent = 'Payment unavailable';
  } else {
    payButton.disabled = false;
  }
}

async function getBooking() {
  if (!ref || !/^[A-Za-z0-9_-]{1,64}$/.test(ref)) throw new Error('Missing or invalid booking reference.');
  const response = await fetch('/api/bookings/' + encodeURIComponent(ref), { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(response.status === 404 ? 'Booking not found.' : 'Unable to load booking.');
  return response.json();
}

async function startCheckout() {
  payButton.disabled = true;
  message.textContent = 'Preparing your signed PayHere checkout…';
  try {
    const response = await fetch('/api/bookings/' + encodeURIComponent(ref) + '/checkout', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:'{}' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Checkout unavailable.');
    form.action = data.action;
    form.replaceChildren();
    for (const [key, value] of Object.entries(data.fields)) {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = key; input.value = String(value);
      form.appendChild(input);
    }
    message.textContent = 'Opening PayHere secure checkout…';
    form.submit();
  } catch (error) {
    message.textContent = error instanceof Error ? error.message : 'Unable to start payment.';
    payButton.disabled = false;
  }
}

payButton.addEventListener('click', startCheckout);

(async function init() {
  try {
    const booking = await getBooking();
    showBooking(booking);
    if (result === 'cancelled') message.textContent = 'Payment was cancelled. Your booking remains pending while the payment window is open.';
    else if (result === 'success') {
      message.textContent = 'Payment returned successfully. Waiting for server-side confirmation…';
      for (let i = 0; i < 8; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const latest = await getBooking();
        showBooking(latest);
        if (latest.status === 'PAID') { message.textContent = 'Payment confirmed. Your booking is secured.'; break; }
      }
    }
  } catch (error) {
    setStatus('ERROR');
    payButton.disabled = true;
    message.textContent = error instanceof Error ? error.message : 'Unable to load payment page.';
  }
})();
