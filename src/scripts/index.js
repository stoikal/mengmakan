import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import CONFIG from './globals/config';
import Router from './routes/router';
import routes from './routes/routes';
import swRegister from './utils/sw-register';

const { NAV_LINKS } = CONFIG;
const $routerRootEl = document.getElementById('main-content');
const $desktopNav = document.querySelector('.desktop-nav');

// for webpack bundle splitting
import(/* webpackPrefetch: true */ './components') // define custom elements
  .then(() => {
    const $navbarWrapper = document.getElementById('navbar-wrapper');
    const $mobileNav = document.createElement('navigation-drawer');

    $mobileNav.links = NAV_LINKS;
    $navbarWrapper.append($mobileNav);
  });

Object.entries(NAV_LINKS).forEach(([label, href]) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <a href=${href}><span>${label}</span></a>
  `;

  $desktopNav.append(li);
});

const router = new Router(
  $routerRootEl,
  routes,
);

router.init();
swRegister();
