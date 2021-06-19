import FavoriteRestaurantToggler from '../../src/scripts/utils/favorite-restaurant-toggler';

export const initFavRestaurantToggler = async (favoriteRestaurantsModel, restaurant) => {
  const trigger = document.createElement('like-button');
  const presenter = new FavoriteRestaurantToggler({
    favoriteRestaurants: favoriteRestaurantsModel,
    trigger,
    restaurant,
  });
  await presenter.init();

  return {
    element: trigger,
    presenter,
  };
};

export default {
  initFavRestaurantToggler,
};
