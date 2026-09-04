const reviews = [
  // Ajoutez ici uniquement des avis réels, avec l'accord de leur auteur.
  // { quote: "Texte de l'avis", author: "Prénom", context: "Terminale" }
];

const section = document.querySelector('#avis');
const track = document.querySelector('#review-track');
const prev = document.querySelector('#review-prev');
const next = document.querySelector('#review-next');
const nav = document.querySelector('#avis-nav');
const navMobile = document.querySelector('#avis-nav-mobile');

if (reviews.length && section && track) {
  section.hidden = false;
  nav.hidden = false;
  navMobile.hidden = false;
  track.innerHTML = reviews.map(r => `<article class="review-card"><blockquote>“${r.quote}”</blockquote><p>${r.author}${r.context ? ` · ${r.context}` : ''}</p></article>`).join('');
  let index = 0;
  const visible = () => window.innerWidth <= 620 ? 1 : window.innerWidth <= 1000 ? 2 : 3;
  const update = () => {
    const card = track.querySelector('.review-card'); if (!card) return;
    const max = Math.max(0, reviews.length - visible()); index = Math.min(index, max);
    track.style.transform = `translateX(${-index * (card.getBoundingClientRect().width + 16)}px)`;
  };
  prev.addEventListener('click', () => { index = Math.max(0,index-1); update(); });
  next.addEventListener('click', () => { index = Math.min(Math.max(0,reviews.length-visible()),index+1); update(); });
  window.addEventListener('resize', update);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && reviews.length > visible()) {
    setInterval(() => { const max=Math.max(0,reviews.length-visible()); index=index>=max?0:index+1; update(); }, 6500);
  }
}
