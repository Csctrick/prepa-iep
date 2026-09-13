document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const details = link.closest('details');
    if (details) details.open = false;
  });
});

const emailInput = document.querySelector('#contact-email');
const replyTo = document.querySelector('#replyto-hidden');
if (emailInput && replyTo) {
  const syncReplyTo = () => { replyTo.value = emailInput.value.trim(); };
  emailInput.addEventListener('input', syncReplyTo);
  emailInput.form?.addEventListener('submit', syncReplyTo);
}

const params = new URLSearchParams(window.location.search);
if (params.get('sent') === '1') {
  const success = document.querySelector('#form-success');
  if (success) success.hidden = false;
}

const concoursDate = new Date('2027-04-24T08:00:00+02:00').getTime();
const dayEl = document.querySelector('#cd-days');
const hourEl = document.querySelector('#cd-hours');
const minuteEl = document.querySelector('#cd-minutes');
const secondEl = document.querySelector('#cd-seconds');

function updateCountdown() {
  if (!dayEl || !hourEl || !minuteEl || !secondEl) return;
  const now = Date.now();
  let diff = Math.max(0, concoursDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  dayEl.textContent = String(days);
  hourEl.textContent = String(hours).padStart(2, '0');
  minuteEl.textContent = String(minutes).padStart(2, '0');
  secondEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
