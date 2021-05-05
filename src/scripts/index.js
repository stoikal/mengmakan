import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA';
import RestaurantList from './components/RestaurantList';

class DOM {
  static render(el, parentId) {
    const parent = document.getElementById(parentId);
    parent.append(el)
  }
}

const restaurantList = new RestaurantList(data.restaurants)

DOM.render(restaurantList.render(), 'restaurant-list')