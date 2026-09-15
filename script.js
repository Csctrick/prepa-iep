document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    const details = link.closest('details');
    if (details) details.open = false;
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const value = (name) => String(data.get(name) || '').trim();

    const subject = 'Demande Objectif IEP - ' + (value('Nom') || 'nouveau contact');
    const body = [
      'Bonjour,',
      '',
      'Je souhaite vous contacter au sujet d’une préparation Objectif IEP.',
      '',
      'Nom du parent ou de l’élève : ' + value('Nom'),
      'Email : ' + value('Email'),
      'Téléphone : ' + (value('Téléphone') || 'non renseigné'),
      'Niveau : ' + value('Niveau'),
      'Langue au concours : ' + (value('Langue') || 'non précisée'),
      'Format souhaité : ' + (value('Format') || 'à définir'),
      '',
      'Demande :',
      value('Message'),
      '',
      'Cordialement,'
    ].join('\n');

    const success = document.querySelector('#form-success');
    if (success) success.hidden = false;

    window.location.href = `mailto:objectifiep@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
