import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import './components/loading-indicator';
import './components/restaurant-card';
import './components/navigation-drawer';

import Router from './routes/router';
import routes from './routes/routes';

const $navbarWrapper = document.getElementById('navbar-wrapper');
const $navDrawer = document.createElement('navigation-drawer');

const router = new Router(
  document.getElementById('main-content'),
  routes,
);

router.init();

$navDrawer.links = {
  Home: '/',
  Favorites: '/#/favorites',
  'About Us': '/about',
};

$navbarWrapper.append($navDrawer);
