/* ═══════════════════════════════════════════════════
   SOS iPhone — Main JS
   Optimized for performance + micro-interactions
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Scroll Reveal (throttled) ─── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* ─── Stagger Children ─── */
  const staggerContainers = document.querySelectorAll('.stagger-children');
  if (staggerContainers.length && 'IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    staggerContainers.forEach((el) => staggerObserver.observe(el));
  }

  /* ─── FAQ Accordion ─── */
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* ─── Service Card Spotlight (throttled) ─── */
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length) {
    let ticking = false;
    serviceCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    });
  }

  /* ─── Smooth scroll (passive) ─── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, { passive: true });
  });

  /* ─── Nav background on scroll ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    let navTicking = false;
    window.addEventListener('scroll', () => {
      if (!navTicking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 50) {
            nav.style.background = 'rgba(8, 8, 12, 0.95)';
            nav.style.borderBottomColor = 'rgba(255, 45, 45, 0.1)';
          } else {
            nav.style.background = 'rgba(8, 8, 12, 0.85)';
            nav.style.borderBottomColor = 'var(--border)';
          }
          navTicking = false;
        });
        navTicking = true;
      }
    }, { passive: true });
  }

  /* ─── Parallax hero glow ─── */
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow) {
    let glowTicking = false;
    window.addEventListener('mousemove', (e) => {
      if (!glowTicking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          heroGlow.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(255, 45, 45, 0.12) 0%, transparent 50%)`;
          glowTicking = false;
        });
        glowTicking = true;
      }
    }, { passive: true });
  }

  /* ─── Hero entrance animation ─── */
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => {
      hero.classList.add('loaded');
    });
  }

  /* ─── Hero Particles ─── */
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }

  /* ─── Typewriter Effect ─── */
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const text = typewriterEl.getAttribute('data-text');
    let index = 0;
    const startDelay = 1200;
    
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          typewriterEl.textContent = text.substring(0, index + 1);
          index++;
        } else {
          clearInterval(typeInterval);
          typewriterEl.classList.add('done');
        }
      }, 40);
    }, startDelay);
  }

  /* ─── Button ripple effect ─── */
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: translate(-50%, -50%);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
      `;
      this.appendChild(ripple);
      requestAnimationFrame(() => {
        ripple.style.transition = 'width 0.6s ease, height 0.6s ease, opacity 0.6s ease';
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        ripple.style.opacity = '0';
      });
      setTimeout(() => ripple.remove(), 600);
    });
  });

})();
