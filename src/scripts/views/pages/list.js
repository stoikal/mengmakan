import Restaurants from '../../data/restaurants';
import styles from '../../../styles/listContainer.module.css';

export default {
  async render() {
    const container = document.createElement('div');
    container.className = styles.listContainer;

    const list = await Restaurants.list();
    const img = document.createElement('img');
    img.setAttribute('src', 'https://restaurant-api.dicoding.dev/images/small/14');
    container.append(img)
    list.forEach((item) => {
      const restaurant = document.createElement('restaurant-card');
      restaurant.details = item;

      container.append(restaurant);
    });

    return container;
  },
};
