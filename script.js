// Small vanilla-JS enhancements; the site remains readable without JavaScript.
(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const progress = document.getElementById('scroll-progress');
  let ticking = false;
  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.width = `${Math.min(100, Math.max(0, (window.scrollY / max) * 100))}%`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const target = document.getElementById('typing-target');
  const words = ['whoami', 'explore --dfir', 'build --secure', 'investigate --curious', 'learn --always'];
  if (target && !reduceMotion) {
    let wordIndex = 0, cursor = words[0].length, deleting = true;
    const type = () => {
      const word = words[wordIndex];
      target.textContent = word.slice(0, cursor);
      let wait = deleting ? 60 : 95;
      if (deleting) {
        cursor -= 1;
        if (cursor < 0) {
          wordIndex = (wordIndex + 1) % words.length;
          cursor = 0;
          deleting = false;
          wait = 270;
        }
      } else {
        cursor += 1;
        if (cursor > words[wordIndex].length) {
          cursor = words[wordIndex].length;
          deleting = true;
          wait = 1600;
        }
      }
      window.setTimeout(type, wait);
    };
    window.setTimeout(type, 1400);
  }

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selection = button.dataset.filter;
    filterButtons.forEach(item => {
      const current = item === button;
      item.classList.toggle('active', current);
      item.setAttribute('aria-pressed', String(current));
    });
    projectCards.forEach(card => {
      card.hidden = !(selection === 'all' || card.dataset.category === selection);
    });
  }));

  // If the live third-party stats endpoint is blocked or down, use local artwork.
  document.querySelectorAll('.github-insights img').forEach((img, index) => {
    const fallback = index === 0 ? 'assets/stats-overview.svg' : 'assets/stats-languages.svg';
    const showFallback = () => {
      if (!img.src.endsWith(fallback)) img.src = fallback;
    };
    img.addEventListener('error', showFallback);
    if (img.complete && img.naturalWidth === 0) showFallback();
  });

  const copy = document.getElementById('copy-email');
  const toast = document.getElementById('toast');
  let toastTimeout;
  if (copy && toast) {
    copy.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText('tharunsasanka0@gmail.com');
        toast.textContent = 'EMAIL COPIED TO CLIPBOARD';
      } catch {
        toast.textContent = 'COPY MANUALLY: tharunsasanka0@gmail.com';
      }
      toast.classList.add('visible');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => toast.classList.remove('visible'), 3300);
    });
  }
})();
