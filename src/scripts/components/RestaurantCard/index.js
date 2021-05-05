import * as styles from './card.module.css'

export default class RestaurantCard {
  constructor(detail) {
    this.restaurant = detail || {};
  }

  render() {
    console.log("styles", styles)
    const { city, description, id, name, pictureId, rating } = this.restaurant;
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
      <span>${name}</span>
    `
    return card;
  }
}

