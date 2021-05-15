import RestaurantList from '../views/pages/list';
import RestaurantDetail from '../views/pages/detail';
import FavoriteRestaurants from '../views/pages/favorites';

export default {
  '/': RestaurantList,
  '/detail': RestaurantDetail,
  '/favorites': FavoriteRestaurants,
};
