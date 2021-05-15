import Restaurants from '../../data/restaurants';
import styles from '../../../styles/listContainer.module.css';

export default {
  async render() {
    const container = document.createElement('div');
    container.className = styles.listContainer;

    const list = await Restaurants.list();
    list.forEach((item) => {
      const restaurant = document.createElement('restaurant-card');
      restaurant.details = item;

      container.append(restaurant);
    });

    return container;
  },
};
