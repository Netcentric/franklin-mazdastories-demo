import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;
    const externalLinks = footer.querySelectorAll(':scope > div:nth-child(2)');
    const socialLinks = footer.querySelectorAll(':scope > div:nth-child(3)');
    const logoContainer = footer.querySelectorAll(':scope > div:nth-child(4)');

    externalLinks.forEach((linkList) => {
      linkList.classList.add('external-links');
    });

    socialLinks.forEach((linkList) => {
      linkList.classList.add('social-links');
    });

    logoContainer.forEach((container) => {
      container.classList.add('logo-container');
    });

    footer.querySelectorAll('a > span.icon').forEach((icon) => {
      const a = icon.parentElement;
      const iconName = icon.classList[1].substring(5, icon.classList[1].length);
      a.title = a.title || iconName;
    });

    // add link title for all icon only links
    footer.querySelectorAll('a > span.icon').forEach((icon) => {
      const a = icon.parentElement;
      const iconName = icon.classList[1].substring(5, icon.classList[1].length);
      a.title = a.title || iconName;
    });

    decorateIcons(footer);
    block.append(footer);
  }
}
