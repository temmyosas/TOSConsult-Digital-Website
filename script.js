/* ===========================
   TOSConsult Digital — script.js
=========================== */

// ── NAVBAR SCROLL BEHAVIOR ──
const navbar = document.getElementById('navbar');
const urgencyBanner = document.getElementById('urgencyBanner');
const backTop = document.getElementById('backTop');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // Hide urgency banner on scroll down
  if (currentScroll > 60) {
    urgencyBanner.classList.add('hidden');
    navbar.classList.add('scrolled');
  } else {
    urgencyBanner.classList.remove('hidden');
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  if (currentScroll > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }

  lastScroll = currentScroll;
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open clicked if it wasn't open
    if (!isOpen) item.classList.add('open');
  });
});

// ── BUSINESS HOURS STATUS ──
function checkBusinessHours() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours + minutes / 60;

  const el = document.getElementById('openStatus');
  if (!el) return;

  let isOpen = false;

  if (day === 0) {
    // Sunday: 12pm–10pm
    isOpen = time >= 12 && time < 22;
  } else if (day >= 1 && day <= 6) {
    // Mon–Sat: 9am–10pm
    isOpen = time >= 9 && time < 22;
  }

  el.className = 'open-status ' + (isOpen ? 'open' : 'closed');
  el.textContent = isOpen ? '🟢 We are currently OPEN' : '🔴 Currently CLOSED — Message us on WhatsApp';
}
checkBusinessHours();

// ── CONTACT FORM SUBMIT ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('formSuccess').style.display = 'block';
      contactForm.reset();
      btn.textContent = '🚀 Send Message';
      btn.disabled = false;
    }, 1200);
  });
}

// ── LEAD FORM SUBMIT ──
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('button[type="submit"]');
    btn.textContent = '🎉 You\'re subscribed!';
    btn.disabled = true;
    btn.style.background = '#00A855';
    setTimeout(() => {
      leadForm.reset();
      btn.textContent = '🚀 Get My Free Kit';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  });
}

// ── SMOOTH ACTIVE NAV LINKS ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--orange)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ── COUNTER ANIMATION ──
function animateCounter(el, end, duration = 1800) {
  let start = 0;
  const step = end / (duration / 16);
  const suffix = el.dataset.suffix || '';
  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      start = end;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9,]/g, '');
      if (num) {
        el.dataset.suffix = suffix;
        animateCounter(el, num);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.big-num, .stat-number').forEach(el => {
  counterObserver.observe(el);
});

// ── NAVBAR OVERLAY CLOSE ON OUTSIDE CLICK ──
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  }
});

console.log('%c TOSConsult Digital 🚀', 'color:#FF6B00;font-size:1.2rem;font-weight:bold;');
console.log('%c Digital Profit Blueprint — Built with ❤️', 'color:#666;font-size:0.85rem;');
