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
