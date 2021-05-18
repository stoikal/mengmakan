import Restaurants from '../../data/restaurants';
import styles from '../../../styles/listContainer.module.css';
import connectFavToggler from '../../utils/connect-favorite-toggler';

export default {
  async render() {
    const $container = document.createElement('div');
    $container.className = styles.listContainer;

    const list = await Restaurants.list();

    list.forEach(async (restaurant) => {
      const $restaurantCard = await connectFavToggler(document.createElement('restaurant-card'), restaurant);
      $restaurantCard.details = restaurant;

      $container.append($restaurantCard);
    });

    return $container;
  },
};
