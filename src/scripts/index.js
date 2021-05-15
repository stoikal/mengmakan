import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import './components/loading-indicator';
import './components/restaurant-card';
import './components/navigation-drawer';

import CONFIG from './globals/config';
import Router from './routes/router';
import routes from './routes/routes';

const { NAV_LINKS } = CONFIG;
const $navbarWrapper = document.getElementById('navbar-wrapper');
const $desktopNav = document.querySelector('.desktop-nav');
const $mobileNav = document.createElement('navigation-drawer');

const router = new Router(
  document.getElementById('main-content'),
  routes,
);

router.init();
Object.entries(NAV_LINKS).forEach(([label, href]) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href=${href}><span>${label}</span></a>
  `;

  $desktopNav.append(li);
});
$mobileNav.links = NAV_LINKS;
$navbarWrapper.append($mobileNav);
