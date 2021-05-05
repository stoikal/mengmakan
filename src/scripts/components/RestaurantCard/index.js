import styles from './card.module.css';

export default class RestaurantCard {
  constructor(detail) {
    this.restaurant = detail || {};
  }

  render() {
    console.log(styles)
    // Minimal menampilkan gambar, kota, rating, dan deskripsi
    const { city, description, id, name, pictureId: imgSrc, rating } = this.restaurant;
    const card = document.createElement('div');

    card.className = styles.container;
    card.innerHTML = `
      <div class=${styles.thumbWrapper}>
        <img src=${imgSrc} alt="suasana restoran"/>
        <span>${city}</span>
      </div>
      <div>
        <span>Rating: ${rating}</span>
        <p>${name}</p>
        <p>${description}</p>
      </div>
    `
    return card;
  }
}

