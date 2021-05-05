import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA';
import RestaurantList from './components/RestaurantList';
import SideNav from './components/SideNav';

class DOM {
  static render(el, parentId) {
    const parent = document.getElementById(parentId);
    parent.append(...el)
  }
}

const restaurantList = new RestaurantList(data.restaurants);
const sideNav = new SideNav();

DOM.render(
  [
    restaurantList.render(),
    sideNav.render()
  ], 
  'restaurant-list'
)