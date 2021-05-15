import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json';
import ListContainer from './components/listContainer';
import SideNav from './components/sideNav';
import './components/restaurantCard';

import Router from './routes/router';
import routes from './routes/routes';

const sideNav = new SideNav();
// const restaurantList = new ListContainer(
//   data.restaurants,
//   (item) => {
//     const el = document.createElement('restaurant-card');
//     el.details = item;
//     return el;
//   },
// );

// document
//   .getElementById('main-content')
//   .append(restaurantList.render());

document
  .getElementById('navbar-wrapper')
  .append(sideNav.render());

const router = new Router(
  document.getElementById('main-content'),
  routes,
);

router.init();
