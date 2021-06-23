import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.css';

import CONFIG from './globals/config';
import Router from './routes/router';
import routes from './routes/routes';
import swRegister from './utils/sw-register';

// defines custom elements
import(/* webpackPrefetch: true */ './components');

const { NAV_LINKS } = CONFIG;
const $navbarWrapper = document.getElementById('navbar-wrapper');
const $desktopNav = document.querySelector('.desktop-nav');
const $mobileNav = document.createElement('navigation-drawer');
const $routerRootEl = document.getElementById('main-content');

const router = new Router(
  $routerRootEl,
  routes,
);

Object.entries(NAV_LINKS).forEach(([label, href]) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href=${href}><span>${label}</span></a>
  `;

  $desktopNav.append(li);
});

$navbarWrapper.append($mobileNav);
$mobileNav.setAttribute('links', JSON.stringify(NAV_LINKS));

router.init();
swRegister();
