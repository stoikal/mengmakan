import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb';
import { initFavRestaurantToggler } from './helpers/testFactories';

const Model = FavoriteRestaurantIdb;
const initToggler = initFavRestaurantToggler.bind(null, Model);

describe('Remove restaurant from favorites', () => {
  beforeEach(async () => {
    await Model.put({ id: 1 });
  });

  it('should show unlike button for restaurant that has been liked', async () => {
    const { element } = await initToggler({ id: 1 });

    expect(element.liked).toBe(true);
    expect(element.hasAttribute('liked')).toBe(true);

    await Model.delete(1);
  });

  it('should be able to remove restaurant from favorites', async () => {
    const { element } = await initToggler({ id: 1 });

    element.button.click();

    expect(await Model.list()).toEqual([]);
  });

  xit('should not throw error if unliked restaurant is not in favorites', async () => {
    const { element } = await initToggler({ id: 2 });

    await Model.delete(2);
    element.button.click();

    expect(await Model.list()).toEqual([{ id: 1 }]);
  });

  it('should not throw error if restaurant id is not provided', async () => {
    const { element } = await initToggler({});

    element.button.click();

    expect(await Model.list()).toEqual([{ id: 1 }]);
  });
});
