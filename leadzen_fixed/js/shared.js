/* ============================================================
   LeadZen — Shared JavaScript Utilities
   ============================================================ */

// ── THEME ──────────────────────────────────────────────────
const Theme = (() => {
  const key = 'leadzen-theme';
  const root = document.documentElement;

  function get() {
    return localStorage.getItem(key) || 'dark';
  }
  function set(t) {
    localStorage.setItem(key, t);
    root.setAttribute('data-theme', t);
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = t === 'dark' ? '☀️' : '🌙';
      btn.title = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }
  function toggle() {
    set(get() === 'dark' ? 'light' : 'dark');
  }
  function init() {
    set(get());
  }
  return { get, set, toggle, init };
})();

// ── TOAST ──────────────────────────────────────────────────
const Toast = (() => {
  let container;
  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }
  function show(msg, type = 'info', sub = '', duration = 3500) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div><div class="toast-msg">${msg}</div>${sub ? `<div class="toast-sub">${sub}</div>` : ''}</div>
    `;
    getContainer().appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s, transform 0.3s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(20px)';
      setTimeout(() => el.remove(), 300);
    }, duration);
  }
  return { show };
})();

// ── MODAL ──────────────────────────────────────────────────
const Modal = (() => {
  function open(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function close(id) {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  }
  function closeOnBackdrop(e) {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  function init() {
    document.querySelectorAll('.modal-backdrop').forEach(el => {
      el.addEventListener('click', closeOnBackdrop);
    });
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const backdrop = btn.closest('.modal-backdrop');
        if (backdrop) { backdrop.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
  }
  return { open, close, init };
})();

// ── NAV ────────────────────────────────────────────────────
const Nav = (() => {
  function init() {
    // Active link
    const rawPage = window.location.pathname.split('/').pop();
    const current = rawPage === '' || rawPage === '/' ? 'index.html' : rawPage;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === current || (current === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
    // Mobile hamburger
    const burger = document.querySelector('.nav-hamburger');
    const links = document.querySelector('.nav-links');
    if (burger && links) {
      burger.addEventListener('click', () => {
        links.classList.toggle('mobile-open');
      });
    }
    // Keyboard ESC closes mobile menu
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links) links.classList.remove('mobile-open');
    });
  }
  return { init };
})();

// ── NUMBER ANIMATION ───────────────────────────────────────
function animateCount(el, target, duration = 900, prefix = '', suffix = '') {
  const start = performance.now();
  const from = parseFloat(el.dataset.from || 0);
  const isFloat = String(target).includes('.');
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = from + (target - from) * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ─────────────
function initScrollAnimations() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-scroll-anim]').forEach(el => {
    el.style.animationPlayState = 'paused';
    el.classList.add('anim-fade-up');
    obs.observe(el);
  });
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Nav.init();
  Modal.init();
  initScrollAnimations();

  // Theme toggle buttons
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', Theme.toggle);
  });
});
