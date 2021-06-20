import Restaurants from '../../data/restaurants';
import CONFIG from '../../globals/config';
import styles from '../../../styles/detail.module.css';
import FavoriteRestaurantToggler from '../../utils/favorite-restaurant-toggler';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurants-idb';

export default {
  _getMenu(menus) {
    const { foods, drinks } = menus;
    return `
      <div class=${styles.menuContainer}>
        <span><b>Makanan</b></span>
        <ul>
          ${foods.map(({ name }) => `<li>${name}</li>`).join('')}
        </ul>
        <span><b>Minuman</b></span>
        <ul>
          ${drinks.map(({ name }) => `<li>${name}</li>`).join('')}
        </ul>
      </div>
    `;
  },

  _getReviews(reviews) {
    const reviewFromNewest = reviews.reverse();

    return reviewFromNewest.map(({ name, review, date }) => `
      <div class=${styles.review} name="review-item">
        <span><b>${name}</b> @ ${date} :</span>
        <p>${review}</p>
      </div>
    `).join('');
  },

  _getTemplate(restaurant) {
    const {
      name, address, city, pictureId, rating, description, categories, menus, customerReviews,
    } = restaurant;
    const imgSrc = `${CONFIG.BASE_IMAGE_URL}/large/${pictureId}`;
    const categoriesStr = categories
      .map((item) => item.name)
      .join(', ');

    return `
      <h2>${name}</h2>
      <div class=${styles.restaurantInfo} name="restaurant-detail">
        <span class=${styles.addressLabel}>Alamat</span>
        <span class=${styles.address}>${address}, ${city}</span>
        <img src=${imgSrc} alt=${name}/>
        <span class=${styles.label}>Rating</span>
        <span class=${styles.value}>${rating}</span>
        <span class=${styles.label}>Kategori</span>
        <span class=${styles.value}>${categoriesStr}</span>
        <p class=${styles.description}>${description}</p>
      </div>
      <tabs-container>
        <tab-content title="Review">
          <review-form></review-form>
          <div class=${styles.reviewContainer} name="review-container">
            ${this._getReviews(customerReviews)}
          </div>
        </tab-content>
        <tab-content title="Menu">
          ${this._getMenu(menus)}
        </tab-content>
      </tabs-container>
    `;
  },

  async _getRestaurant() {
    const id = window.location.hash.split('/')[2];
    return Restaurants.retrieve(id);
  },

  _createSubmitHandler(restaurantId) {
    return (detail) => {
      const { name, review } = detail;

      return Restaurants.postReview({ id: restaurantId, name, review })
        .then((res) => {
          if (res.customerReviews) {
            const $reviewContainer = document.querySelector(`.${styles.reviewContainer}`);
            $reviewContainer.innerHTML = this._getReviews(res.customerReviews);
          }
        });
    };
  },

  async render() {
    const $container = document.createElement('div');
    const restaurant = await this._getRestaurant();
    $container.className = styles.container;
    $container.innerHTML = this._getTemplate(restaurant);

    const $likeButton = document.createElement('like-button');
    const favRestaurantToggler = new FavoriteRestaurantToggler({
      trigger: $likeButton,
      favoriteRestaurants: FavoriteRestaurantsIdb,
      restaurant,
    });
    await favRestaurantToggler.init();

    $container.append($likeButton);

    const $form = $container.querySelector('review-form');
    $form.onSubmit = this._createSubmitHandler(restaurant.id);

    return $container;
  },
};
