document.addEventListener('DOMContentLoaded', () => {
  const rotatingElements = document.querySelectorAll('[data-rotate]');

  rotatingElements.forEach((element) => {
    const values = (element.dataset.rotate || '')
      .split('|')
      .map((value) => value.trim())
      .filter(Boolean);

    if (values.length === 0) {
      return;
    }

    if (values.length === 1) {
      element.textContent = values[0];
      element.classList.add('is-visible');
      return;
    }

    let index = 0;
    const interval = parseInt(element.dataset.rotateInterval, 10) || 2800;

    const rotate = () => {
      element.classList.remove('is-visible');
      void element.offsetWidth;
      element.textContent = values[index];
      element.classList.add('is-visible');
      index = (index + 1) % values.length;
    };

    rotate();
    setInterval(rotate, interval);
  });

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('is-open');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });
  }
});
