'use strict';

const projects = {
  csg: {
    title: 'CSG Guides',
    category: 'AEM Cloud',
    date: 'June 2026',
    summary: 'Reusable directory development, backend testing, and cloud delivery for CSG Guides.',
    contributions: [
      'Developed a reusable AEM Page Directory component aggregating 60+ pages with A–Z navigation and search, reducing manual page curation by 100%.',
      'Implemented unit testing for OSGi services and Sling Models using JUnit and Apache Sling Mocks.',
      'Used Adobe Cloud Manager CI/CD pipelines for automated builds, dispatcher validation, and cloud deployments.'
    ],
    technologies: ['AEM as a Cloud Service', 'Java', 'JavaScript', 'Guides', 'JSON', 'OSGi', 'Sling Models', 'JUnit', 'Apache Sling Mocks', 'Adobe Cloud Manager']
  },
  fresenius: {
    title: 'Fresenius Medical Care',
    category: 'Global Platforms',
    date: 'March 2025 – May 2026',
    summary: 'AEM Global Sites Translation: backend content delivery and reusable frontend components for international sites.',
    contributions: [
      'Engineered Java Servlet and REST-based backend solutions supporting content delivery across 21 international AEM sites.',
      'Developed reusable React components, reducing development effort by 40%.',
      'Enhanced Hero Banner functionality, reducing developer dependency by 60%.'
    ],
    technologies: ['AEM 6.5', 'Java', 'React', 'Java Servlets', 'REST APIs', 'JSON', 'XML', 'i18n']
  },
  kelloggs: {
    title: 'Kellogg’s AU & NZ',
    category: 'Global Platforms',
    date: 'April 2022 – July 2024',
    summary: 'AEM component development and content operations for Australia and New Zealand digital experiences.',
    contributions: [
      'Developed 25+ custom AEM components for global digital experiences.',
      'Managed AEM Assets, permissions, and workflows.'
    ],
    technologies: ['AEM', 'AEM Assets', 'Permissions', 'Workflows']
  }
};

if (window.lucide) window.lucide.createIcons();
document.getElementById('year').textContent = new Date().getFullYear();

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => {
      const selected = item === filter;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visibleCount = 0;
    cards.forEach((card) => {
      card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
      if (!card.hidden) visibleCount += 1;
    });
    document.getElementById('filter-status').textContent = `Showing ${visibleCount} ${visibleCount === 1 ? 'project' : 'projects'}.`;
  });
});

const dialog = document.getElementById('project-dialog');
let dialogTrigger;

document.querySelectorAll('[data-project]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const project = projects[trigger.dataset.project];
    dialogTrigger = trigger;
    document.getElementById('dialog-title').textContent = project.title;
    document.getElementById('dialog-category').textContent = project.category;
    document.getElementById('dialog-date').textContent = project.date;
    document.getElementById('dialog-summary').textContent = project.summary;
    document.getElementById('dialog-contributions').replaceChildren(...project.contributions.map((contribution) => {
      const item = document.createElement('li');
      item.textContent = contribution;
      return item;
    }));
    document.getElementById('dialog-technologies').replaceChildren(...project.technologies.map((technology) => {
      const item = document.createElement('span');
      item.textContent = technology;
      return item;
    }));
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    dialog.querySelector('.dialog-close').focus();
  });
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    dialog.close();
  }
});
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
});

const email = 'amantiwari5375@gmail.com';
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    status.textContent = 'Email address copied.';
  } catch {
    const field = document.createElement('textarea');
    field.value = email;
    field.setAttribute('aria-label', 'Email address to copy');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    document.getElementById('copy-email').focus({ preventScroll: true });
    status.textContent = copied ? 'Email address copied.' : `Copy unavailable. Select and copy: ${email}`;
  }
});