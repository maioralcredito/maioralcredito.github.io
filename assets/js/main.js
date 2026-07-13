// ============================================================================
// Maioral Crédito, site institucional
// ============================================================================
const WHATSAPP_NUMBER = '5519989582642';
const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Trabalho em uma clínica odontológica e gostaria de saber mais sobre a parceria com a Maioral Crédito.';

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initWhatsAppLinks() {
  const isPlaceholder = WHATSAPP_NUMBER === '5500000000000';
  const defaultUrl = buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE);

  const floatBtn = document.getElementById('waFloat');
  const contactMethod = document.getElementById('waContactMethod');
  const displayNumber = document.getElementById('waDisplayNumber');

  if (floatBtn) floatBtn.href = defaultUrl;
  if (contactMethod) contactMethod.href = defaultUrl;
  if (displayNumber && !isPlaceholder) {
    const formatted = WHATSAPP_NUMBER.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    displayNumber.textContent = formatted;
  }
}

function initLeadForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.fName.value.trim();
    const clinica = form.fClinica.value.trim();
    const whats = form.fWhats.value.trim();
    const cidade = form.fCidade.value.trim();
    const msg = form.fMsg.value.trim();

    const lines = [
      'Olá! Gostaria que minha clínica se tornasse parceira da Maioral Crédito.',
      `Nome: ${name}`,
      `Clínica: ${clinica}`,
      `WhatsApp: ${whats}`,
    ];
    if (cidade) lines.push(`Cidade/Estado: ${cidade}`);
    if (msg) lines.push(`Mensagem: ${msg}`);

    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener');
  });
}

function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHeroParallax() {
  const title = document.getElementById('heroTitle');
  if (!title || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const range = 400;
  const update = () => {
    const progress = Math.min(window.scrollY / range, 1);
    title.style.transform = `translateY(${progress * -40}px)`;
    title.style.opacity = String(1 - progress * 0.6);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initRevealOnScroll() {
  const items = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

function initCountUp() {
  const els = document.querySelectorAll('.big-number');
  if (!els.length) return;

  els.forEach((el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/[\d.]+/);
    if (!match) return;
    el.dataset.target = match[0].replace(/\./g, '');
    el.dataset.prefix = raw.slice(0, raw.indexOf(match[0]));
  });

  const animate = (el) => {
    const target = Number(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initLeadForm();
  initHeaderScroll();
  initHeroParallax();
  initMobileNav();
  initRevealOnScroll();
  initCountUp();
  initFooterYear();
});
