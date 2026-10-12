document.getElementById("year").textContent = new Date().getFullYear();

// Keep the narrative index aligned with the chapter currently being read.
const chapters = document.querySelectorAll('.story-chapter');
if (chapters.length && 'IntersectionObserver' in window) {
  const chapterObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll('.story-progress a').forEach(link => {
        if (link.dataset.stage === entry.target.id) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  chapters.forEach(chapter => chapterObserver.observe(chapter));
}

// Preserve deep-link placement while the homepage images and fonts finish loading.
if (['#about', '#experience'].includes(location.hash)) {
  let userMoved = false;
  const cancelAlignment = () => { userMoved = true; };
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(event =>
    window.addEventListener(event, cancelAlignment, { once: true, passive: true })
  );
  document.querySelectorAll('.editorial-work img').forEach(img => { img.loading = 'eager'; });
  const loaded = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
  Promise.all([loaded, document.fonts ? document.fonts.ready : Promise.resolve()]).then(() => {
    if (userMoved || !['#about', '#experience'].includes(location.hash)) return;
    requestAnimationFrame(() => {
      const target = document.getElementById('about');
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top, behavior: 'instant' });
    });
  });
}
