import { itActsAsFavoriteRestaurantsModel } from './contracts/favoriteRestaurantsModel';
import FavoriteRestaurantsIdb from '../src/scripts/data/favorite-restaurants-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantsIdb.list()).forEach(async (restaurant) => {
      await FavoriteRestaurantsIdb.delete(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantsModel(FavoriteRestaurantsIdb);
});
