const ref = new URLSearchParams(location.search).get('booking');
const result = new URLSearchParams(location.search).get('result');
const status = document.getElementById('status');
const summary = document.getElementById('summary');
const form = document.getElementById('payhere');
const retry = document.getElementById('retry');

async function getBooking() {
  if (!ref || !/^[A-Za-z0-9_-]{1,64}$/.test(ref)) throw new Error('Missing or invalid booking reference.');
  const r = await fetch('/api/bookings/' + encodeURIComponent(ref));
  if (!r.ok) throw new Error('Booking not found');
  return r.json();
}
function showBooking(booking) {
  summary.classList.remove('hidden'); summary.textContent = '';
  for (const [label, value] of [['Booking', booking.publicRef], ['Experience', booking.packageTitle], ['Total', 'Rs. ' + Number(booking.totalLkr).toLocaleString()], ['Status', booking.status]]) {
    const row = document.createElement('div'); row.className = 'flex justify-between mt-3';
    const a = document.createElement('span'); a.className = 'text-white/50'; a.textContent = label;
    const strong = document.createElement('strong'); strong.textContent = value;
    row.append(a, strong); summary.appendChild(row);
  }
}
async function start() {
  try {
    const booking = await getBooking(); showBooking(booking);
    if (result === 'cancelled') { status.textContent = 'Payment was cancelled. Your booking remains pending until the payment window expires.'; retry.classList.remove('hidden'); return; }
    if (result === 'success') {
      status.textContent = 'Payment returned successfully. Waiting for PayHere server confirmation…';
      for (let i=0;i<6;i++) { await new Promise(r=>setTimeout(r,2000)); const latest=await getBooking(); showBooking(latest); if(latest.status==='PAID'){status.textContent='Payment confirmed. Your booking is secured.';return;} }
      status.textContent = 'Payment was returned, but confirmation is still processing. Please refresh shortly.'; return;
    }
    const c = await fetch('/api/bookings/' + encodeURIComponent(ref) + '/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    const data = await c.json(); if (!c.ok) throw new Error(data.error || 'Checkout unavailable');
    form.action = data.action;
    for (const [key, value] of Object.entries(data.fields)) { const input=document.createElement('input'); input.type='hidden'; input.name=key; input.value=value; form.appendChild(input); }
    status.textContent = 'Redirecting to PayHere…'; form.submit();
  } catch (e) { status.textContent = e instanceof Error ? e.message : 'Unable to start payment.'; retry.classList.remove('hidden'); }
}
retry.addEventListener('click', () => { location.href = '/payment.html?booking=' + encodeURIComponent(ref); });
start();
