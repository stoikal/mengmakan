import RestaurantCard from '../RestaurantCard';

export default class RestaurantList {
  constructor(list) {
    this.list = list || [];
  }

  render() {
    const wrapperEl = document.createElement('div');
    wrapperEl.className = 'restaurant-list-wrapper';
    
    this.list.forEach((restaurant) => {
      const card = new RestaurantCard(restaurant)
      wrapperEl.append(
        card.render()
      )
    })

    return wrapperEl;
  }
}