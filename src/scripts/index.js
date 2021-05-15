import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json';
import ListContainer from './components/listContainer';
import SideNav from './components/sideNav';
import './components/restaurantCard';

import App from './app';
import Restaurants from './api/restaurants';

const sideNav = new SideNav();
const restaurantList = new ListContainer(
  data.restaurants,
  (item) => {
    const el = document.createElement('restaurant-card');
    el.details = item;
    return el;
  },
);

document
  .getElementById('main-content')
  .append(restaurantList.render());

document
  .getElementById('navbar-wrapper')
  .append(sideNav.render());
