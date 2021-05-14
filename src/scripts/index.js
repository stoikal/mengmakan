import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json';
import ListContainer from './components/listContainer';
import SideNav from './components/sideNav';
import Card from './components/restaurantCard';

import Restaurants from './api/restaurants';

// import './webComponents';

const sideNav = new SideNav();
const restaurantList = new ListContainer(
  data.restaurants,
  (item) => new Card(item),
);

document
  .getElementById('restaurant-list')
  .append(restaurantList.render());

document
  .getElementById('navbar-wrapper')
  .append(sideNav.render());

(async () => {
  const restaurants = await Restaurants.postReview({
    id: "fnfn8mytkpmkfw1e867",
    name: "John",
    review: "enak dan tempatnya bagus"
  });
  console.log(restaurants);
})();
