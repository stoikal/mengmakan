import styles from './listContainer.module.css';

export default class RestaurantList {
  constructor(list, renderItem) {
    this.list = list || [];
    this.renderItem = renderItem;
  }

  render() {
    const container = document.createElement('div');
    container.className = styles.listContainer;
    
    this.list.forEach((item) => {
      const itemEl = this.renderItem(item);

      container.append(
        itemEl.render()
      )
    })

    return container;
  }
}