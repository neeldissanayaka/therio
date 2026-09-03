const login = document.getElementById('login');
const app = document.getElementById('app');
const list = document.getElementById('list');
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');
const email = document.getElementById('email');
const password = document.getElementById('password');
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

async function load() {
  const r = await fetch('/api/bookings?page=1&pageSize=50');
  if (!r.ok) { login.hidden = false; app.hidden = true; return; }
  login.hidden = true; app.hidden = false;
  const d = await r.json();
  list.innerHTML = '<div class="row"><b>Ref</b><b>Date</b><b>Customer</b><b>Total</b><b>Status</b></div>' + d.items.map(b =>
    '<div class="row"><span>' + esc(b.publicRef) + '</span><span>' + esc(b.bookingDate.slice(0,10)) + ' · ' + esc(b.slotLabel) + '</span><span>' + esc(b.firstName) + ' ' + esc(b.lastName) + '<br>' + esc(b.email) + '</span><span>Rs. ' + esc(b.totalLkr.toLocaleString()) + '</span><select data-ref="' + esc(b.publicRef) + '"><option ' + (b.status==='PENDING_PAYMENT'?'selected':'') + '>PENDING_PAYMENT</option><option ' + (b.status==='PAID'?'selected':'') + '>PAID</option><option ' + (b.status==='PAYMENT_FAILED'?'selected':'') + '>PAYMENT_FAILED</option><option ' + (b.status==='CANCELLED'?'selected':'') + '>CANCELLED</option><option ' + (b.status==='COMPLETED'?'selected':'') + '>COMPLETED</option></select></div>'
  ).join('');
  list.querySelectorAll('select').forEach(s => s.addEventListener('change', async () => {
    const r = await fetch('/api/bookings/' + encodeURIComponent(s.dataset.ref) + '/status', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status:s.value}) });
    if (!r.ok) load();
  }));
}
loginForm.addEventListener('submit', async e => { e.preventDefault(); loginMsg.textContent=''; const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.value,password:password.value})}); if(!r.ok){loginMsg.textContent='Invalid credentials';return} load(); });
document.getElementById('logout').addEventListener('click', async()=>{await fetch('/api/auth/logout',{method:'POST'});load()});
load();
