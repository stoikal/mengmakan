import styles from './card.module.css';

const truncate = (str, maxLength) => {
  const length = str.length;
  
  if (length <= maxLength) {
    return str
  } else {
    return str.slice(0, maxLength) + '...'
  }
}

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
  
        <span>${city}</span>
      </div>
      <div>
        <span>Rating: ${rating}</span>
        <p>${name}</p>
        <p>${truncate(description, 300)}</p>
      </div>
    `
    return card;
  }
}

{/* <img src=${imgSrc} alt="suasana restoran"/> */}