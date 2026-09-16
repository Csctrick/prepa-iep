document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const details = link.closest('details');
    if (details) details.open = false;
  });
});


const contactIntent = document.querySelector('#contact-intent');
const contactSubject = document.querySelector('#contact-subject');

document.querySelectorAll('[data-contact-intent]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!contactIntent) return;
    const intent = link.dataset.contactIntent;
    if ([...contactIntent.options].some((option) => option.value === intent)) {
      contactIntent.value = intent;
    }
  });
});

if (contactIntent && contactSubject) {
  contactIntent.addEventListener('change', () => {
    contactSubject.value = contactIntent.value
      ? `Nouvelle demande Objectif IEP — ${contactIntent.value}`
      : 'Nouvelle demande Objectif IEP';
  });
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const submitButton = document.querySelector('#contact-submit');
  const success = document.querySelector('#form-success');
  const error = document.querySelector('#form-error');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (success) success.hidden = true;
    if (error) error.hidden = true;

    const initialLabel = submitButton ? submitButton.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours…';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Form submission failed');

      contactForm.reset();
      if (success) {
        success.hidden = false;
        success.focus({ preventScroll: true });
      }
    } catch (submissionError) {
      if (error) {
        error.hidden = false;
        error.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = initialLabel || 'Envoyer la demande';
      }
    }
  });
}

const concoursDate = new Date('2027-04-24T09:00:00+02:00').getTime();
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
