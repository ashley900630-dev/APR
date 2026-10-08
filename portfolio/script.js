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
