import '../src/scripts/components/like-button';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb';
import { initFavRestaurantToggler } from './helpers/testFactories';

const Model = FavoriteRestaurantIdb;
const initToggler = initFavRestaurantToggler.bind(null, Model);

describe('Add restaurant to favorites', () => {
  it('should show like button for restaurant that has not been liked', async () => {
    const { element } = await initToggler({ id: 1 });

    expect(element.liked).toBe(false);
    expect(element.hasAttribute('liked')).toBe(false);
  });

  it('should be able to add restaurant to favorites', async () => {
    const { element } = await initToggler({ id: 1 });
    element.button.click();

    const restaurant = await Model.retrieve(1);

    expect(restaurant).toEqual({ id: 1 });

    await Model.delete(1);
  });

  it('should not add restaurant if it is already in favorites', async () => {
    const { element } = await initToggler({ id: 1 });

    await Model.put({ id: 1 });
    element.button.click();

    expect(await Model.list()).toEqual([{ id: 1 }]);

    Model.delete(1);
  });

  it('should not add restaurant if id is not provided', async () => {
    const { element } = await initToggler({ name: 'restaurant_name' });

    element.button.click();

    expect(await Model.list()).toEqual([]);
  });
});
