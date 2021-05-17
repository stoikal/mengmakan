import Restaurants from '../../data/restaurants';
import FavoriteRestaurantsIdb from '../../data/favorite-restaurants-idb';
import CONFIG from '../../globals/config';
import S from '../../../styles/detail.module.css';
import connectFavToggler from '../../utils/connect-favorite-toggler';

export default {
  _getMenu(menus) {
    const { foods, drinks } = menus;
    return `
      <div class=${S.menuContainer}>
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

    return `
      <div class=${S.reviewContainer}>
        ${reviewFromNewest.map(({ name, review, date }) => `
          <div class=${S.review}>
            <span><b>${name}</b> @ ${date} :</span>
            <p>${review}</p>
          </div>
        `).join('')}
      </div>
    `;
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
      <div class=${S.restaurantInfo}>
        <span class=${S.address}>${address}, ${city}</span>
        <img src=${imgSrc} alt=${name}/>
        <span class=${S.label}>Rating</span>
        <span class=${S.value}>${rating}</span>
        <span class=${S.label}>Kategori</span>
        <span class=${S.value}>${categoriesStr}</span>
        <p class=${S.description}>${description}</p>
      </div>
      <like-button class="like-button"></like-button>
      <custom-tabs>
        <tab-content title="Review">
          ${this._getReviews(customerReviews)}
        </tab-content>
        <tab-content title="Menu">
          ${this._getMenu(menus)}
        </tab-content>
      </custom-tabs>
    `;
  },

  async _getRestaurant() {
    const id = window.location.hash.split('/')[2];
    return Restaurants.retrieve(id);
  },

  async render() {
    const $container = document.createElement('div');
    const restaurant = await this._getRestaurant();
    $container.className = S.container;
    $container.innerHTML = this._getTemplate(restaurant);

    const $likeButton = $container.querySelector('.like-button');
    connectFavToggler($likeButton, restaurant);

    return $container;
  },
};
