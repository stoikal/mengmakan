import Restaurants from '../../api/restaurants';

export default {
  async render() {
    const container = document.createElement('div');
    const id = window.location.hash.split('/')[2];

    const restaurant = await Restaurants.retrieve(id);
    console.log(restaurant)
    container.innerText = restaurant.name;

    return container;
  },
};
