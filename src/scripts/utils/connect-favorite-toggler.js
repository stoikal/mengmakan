import FavRestaurants from '../data/favorite-restaurants-idb';

const isRestaurantExist = async (id) => {
  const restaurant = await FavRestaurants.retrieve(id);
  return !!restaurant;
};

const toggleFavorite = async (restaurant, cb) => {
  const { id } = restaurant;
  let response;

  if (await isRestaurantExist(id)) {
    response = await FavRestaurants.delete(id);
  } else {
    response = await FavRestaurants.put(restaurant);
  }

  cb(response);
};

const connectFavToggler = async (el, restaurant, callback) => {
  // if (await isRestaurantExist(restaurant.id)) {
  //   el.setAttribute('liked', '');
  // } else {
  //   el.removeAttribute('liked');
  // }

  // el.addEventListener('toggleLike', () => {
  //   toggleFavorite(
  //     restaurant,
  //     (response) => {
  //       if (response) {
  //         el.setAttribute('liked', '');
  //       } else {
  //         el.removeAttribute('liked');
  //       }
  //       if (typeof callback === 'function') callback(response);
  //     },
  //   );
  // });

  return el;
};

export default connectFavToggler;
