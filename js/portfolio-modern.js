(() => {
  'use strict';
  const nav = document.querySelector('.site-nav');
  const toggle = document.getElementById('menu-button');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('mobile-scrim');
  const progress = document.getElementById('reading-progress');
  const filters = [...document.querySelectorAll('.filter')];
  const cards = [...document.querySelectorAll('.project-card')];
  const count = document.getElementById('project-count');
  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  function setMenu(open) {
    if (!toggle || !sidebar || !scrim) return;
    sidebar.classList.toggle('mobile-open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    scrim.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  toggle?.addEventListener('click', () => setMenu(!sidebar?.classList.contains('mobile-open')));
  scrim?.addEventListener('click', () => setMenu(false));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.getAttribute('data-filter');
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = selected === 'todos' || card.dataset.category === selected;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? 'projeto' : 'projetos'}`;
  }));

  const updateProgress = () => {
    const denominator = document.documentElement.scrollHeight - window.innerHeight;
    const amount = denominator > 0 ? Math.min(100, (window.scrollY / denominator) * 100) : 0;
    if (progress) progress.style.width = `${amount}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window) {
    const anchors = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = [...document.querySelectorAll('.page-section[id]')];
    const io = new IntersectionObserver(entries => {
      const active = entries.filter(x => x.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      anchors.forEach(a => a.classList.toggle('active', a.hash === `#${active.target.id}`));
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, .1, .3, .6] });
    sections.forEach(section => io.observe(section));
  }
})();