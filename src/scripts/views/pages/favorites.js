import FavoriteRestaurants from '../../data/favorite-restaurants-idb';
import styles from '../../../styles/listContainer.module.css';
import FavoriteRestaurantToggler from '../../utils/favorite-restaurant-toggler';

export default {
  async render({ renderPage: rerender }) {
    const $container = document.createElement('div');
    $container.className = styles.listContainer;

    const list = await FavoriteRestaurants.list();

    if (list.length) {
      list.forEach(async (restaurant) => {
        const $restaurantCard = document.createElement('restaurant-card');
        $restaurantCard.details = restaurant;
        const favRestaurantToggler = new FavoriteRestaurantToggler({
          trigger: $restaurantCard,
          favoriteRestaurants: FavoriteRestaurants,
          restaurant,
          onToggle: rerender,
        });
        favRestaurantToggler.init();

        $container.append($restaurantCard);
      });
    } else {
      const $message = document.createElement('p');
      $message.innerText = 'Belum ada restoran yang ditambahkan ke favorit!';

      $container.classList.add(styles.empty);
      $container.append($message);
    }

    return $container;
  },
};
