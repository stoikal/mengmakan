import Restaurants from '../../data/restaurants';
import CONFIG from '../../globals/config';
import S from '../../../styles/detail.module.css';

export default {
  _getMenu(menus) {
    const { foods, drinks } = menus;
    return `
      <span>Makanan</span>
      <ul>
        ${foods.map(({ name }) => `<li>${name}</li>`).join('')}
      </ul>
      <span>Minuman</span>
      <ul>
        ${drinks.map(({ name }) => `<li>${name}</li>`).join('')}
      </ul>
    `;
  },

  _getReviews(reviews) {
    const reviewFromNewest = reviews.reverse();

    return reviewFromNewest.map(({ name, review, date }) => `
      <div class=${S.review}>
        <span>${name}</span>
        <span>${date}</span>
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
      <div class=${S.restaurantInfo}>
        <span class=${S.address}>${address}, ${city}</span>
        <img src=${imgSrc} alt=${name}/>
        <span class=${S.label}>Rating</span>
        <span class=${S.value}>${rating}</span>
        <span class=${S.label}>Kategori</span>
        <span class=${S.value}>${categoriesStr}</span>
        <p class=${S.description}>${description}</p>
      </div>
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
    return $container;
  },
};
