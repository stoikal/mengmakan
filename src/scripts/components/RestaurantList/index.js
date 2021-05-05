import RestaurantCard from '../RestaurantCard';
import styles from './listContainer.module.css';

export default class RestaurantList {
  constructor(list) {
    this.list = list || [];
  }

  render() {
    const wrapperEl = document.createElement('div');
    wrapperEl.className = styles.listContainer;
    
    this.list.forEach((restaurant) => {
      const card = new RestaurantCard(restaurant);

      wrapperEl.append(
        card.render()
      )
    })

    return wrapperEl;
  }
}