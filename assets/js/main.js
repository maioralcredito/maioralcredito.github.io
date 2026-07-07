// ============================================================================
// Maioral Crédito — site institucional
// TODO: substitua pelo número real de WhatsApp da Maioral Crédito (com DDI+DDD,
// só dígitos, ex: "5519912345678") antes de publicar em produção.
// ============================================================================
const WHATSAPP_NUMBER = '5500000000000';
const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Sou de uma clínica odontológica e quero saber mais sobre a parceria com a Maioral Crédito.';

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
      'Olá! Quero ser clínica parceira da Maioral Crédito.',
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
  const items = document.querySelectorAll('.reveal');
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

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initLeadForm();
  initHeaderScroll();
  initMobileNav();
  initRevealOnScroll();
  initFooterYear();
});
