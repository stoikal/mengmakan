import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import SideNav from './components/sideNav';
import './components/restaurantCard';
import './components/loadingIndicator';

import Router from './routes/router';
import routes from './routes/routes';

const sideNav = new SideNav();

document
  .getElementById('navbar-wrapper')
  .append(sideNav.render());

const router = new Router(
  document.getElementById('main-content'),
  routes,
);

router.init();
