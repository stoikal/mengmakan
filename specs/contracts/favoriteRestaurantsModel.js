export const itActsAsFavoriteRestaurantsModel = (FavRestaurants) => {
  it('should return the restaurant of the given id', async () => {
    FavRestaurants.put({ id: 1 });
    FavRestaurants.put({ id: 2 });

    expect(await FavRestaurants.retrieve(1))
      .toEqual({ id: 1 });
    expect(await FavRestaurants.retrieve(2))
      .toEqual({ id: 2 });
    expect(await FavRestaurants.retrieve(3))
      .toBeFalsy();
    expect(await FavRestaurants.retrieve())
      .toBeFalsy();
  });

  // restaurant object has to have an id property
  it('should not allow adding restaurant without correct properties', async () => {
    FavRestaurants.put({ name: 'Good Restaurant' });
    FavRestaurants.put({ rating: 4.5 });

    expect(await FavRestaurants.list())
      .toEqual([]);
  });

  it('should overwrite restaurant with the same id', async () => {
    const oldRestaurant = { id: 2, name: 'Old Name' };
    const newRestaurant = { id: 2, name: 'New Restaurant Name' };

    FavRestaurants.put({ id: 1 });
    FavRestaurants.put(oldRestaurant);

    await FavRestaurants.put(newRestaurant);

    expect(await FavRestaurants.retrieve(2))
      .toEqual(newRestaurant);
    expect(await FavRestaurants.list())
      .toEqual([
        { id: 1 },
        newRestaurant,
      ]);
  });

  it('should be able to remove a restaurant from list', async () => {
    FavRestaurants.put({ id: 1 });
    FavRestaurants.put({ id: 2 });
    FavRestaurants.put({ id: 3 });

    await FavRestaurants.delete(2);

    expect(await FavRestaurants.list())
      .toEqual([
        { id: 1 },
        { id: 3 },
      ]);
  });

  it('should not throw error when removing not existing restaurant', async () => {
    FavRestaurants.put({ id: 1 });
    FavRestaurants.put({ id: 2 });

    await FavRestaurants.delete(99);

    expect(await FavRestaurants.list())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });
};

export default {
  itActsAsFavoriteRestaurantsModel,
};
