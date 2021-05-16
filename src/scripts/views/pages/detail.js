import Restaurants from '../../data/restaurants';
import CONFIG from '../../globals/config';
import S from '../../../styles/detail.module.css';

const template = document.createElement('template');
template.innerHTML = `
  <h2 class=${S.title}>Nama Restoran</h2>
  <div class=${S.addressContainer}>
    <span class=${S.address}>Alamat</span>
    <span class=${S.city}>Kota</span>
  </div>
  <div class=${S.imageContainer}>
    <img class=${S.imageContainer}/>
  </div>
  <div>
    <span class=${S.rating}>Rating: -</span>
    <p class=${S.description}>Tidak ada deskripsi</p>
  </div>
`;

export default {
  _getTemplate(restaurant) {
    const {
      name, address, city, pictureId, rating, description, categories, menus, customerReviews,
    } = restaurant;
    const imgSrc = `${CONFIG.BASE_IMAGE_URL}/large/${pictureId}`;
    const categoriesStr = categories
      .map((item) => item.name)
      .join(', ');

    return `
      <h2 class=${S.title}>${name}</h2>
      <div class=${S.addressContainer}>
        <span class=${S.address}>${address}</span>
        <span class=${S.city}>${city}</span>
      </div>
      <div class=${S.imageContainer}>
        <img src=${imgSrc} alt=${name}/>
      </div>
      <div>
        <span class=${S.rating}>Rating: ${rating}</span>
        <span class=${S.rating}>Kategori: ${categoriesStr}</span>
        <p class=${S.description}>${description}</p>
        <custom-tabs>
        </custom-tabs>
      </div>
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

    console.log(restaurant);
    return $container;
  },
};
