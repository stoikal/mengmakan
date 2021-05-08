import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA';
import ListContainer from './components/ListContainer';
import SideNav from './components/SideNav';
import Card from './components/RestaurantCard';

class DOM {
  static insert(el, parentEl) {
    parentEl.append(el);
  }
}

const sideNav = new SideNav();
const restaurantList = new ListContainer(
  data.restaurants,
  (item) => new Card(item),
);

DOM.insert(
  restaurantList.render(),
  document.getElementById('restaurant-list'),
);

DOM.insert(
  sideNav.render(),
  document.getElementById('navbar-wrapper'),
);

console.log('hello');
