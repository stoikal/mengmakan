import styles from './card.module.css';

const truncate = (str, maxLength) => {
  const { length } = str;

  if (length <= maxLength) {
    return str;
  }
  return `${str.slice(0, maxLength).trim()}...`;
};

export default class RestaurantCard {
  constructor(detail) {
    this.restaurant = detail || {};
  }

  render() {
    const {
      city, description, id, name, pictureId: imgSrc, rating,
    } = this.restaurant;
    const card = document.createElement('div');

    card.className = styles.container;
    card.tabIndex = 0;
    card.innerHTML = `
      <div class=${styles.thumbWrapper}>
        <img src=${imgSrc} alt="penampakan restoran"/>
        <span>${city}</span>
      </div>
      <div class=${styles.descriptionWrapper}>
        <span>Rating: ${rating}</span>
        <p><b>${name}</b></p>
        <p>${truncate(description, 150)}</p>
      </div>
    `;
    return card;
  }
}

{ /* <img src=${imgSrc} alt="suasana restoran"/> */ }
