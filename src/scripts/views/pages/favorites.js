import FavoriteRestaurants from '../../data/favorite-restaurants-idb';
import styles from '../../../styles/listContainer.module.css';

export default {
  async render() {
    const container = document.createElement('div');
    container.className = styles.listContainer;

    const list = await FavoriteRestaurants.list();

    list.forEach((item) => {
      const restaurant = document.createElement('restaurant-card');
      restaurant.details = item;

      container.append(restaurant);
    });

    return container;
  },
};
