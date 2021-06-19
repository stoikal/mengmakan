import Restaurants from '../../data/restaurants';
import styles from '../../../styles/listContainer.module.css';
import FavoriteRestaurantToggler from '../../utils/favorite-restaurant-toggler';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurants-idb';

export default {
  async render() {
    const $container = document.createElement('div');
    $container.className = styles.listContainer;

    const list = await Restaurants.list();

    list.forEach(async (restaurant) => {
      const $restaurantCard = document.createElement('restaurant-card');
      $restaurantCard.details = restaurant;
      const favRestaurantToggler = new FavoriteRestaurantToggler({
        trigger: $restaurantCard,
        favoriteRestaurants: FavoriteRestaurantsIdb,
        restaurant,
      });
      await favRestaurantToggler.init();

      $container.append($restaurantCard);
    });

    return $container;
  },
};
