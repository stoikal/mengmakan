import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;
let dbPromise;

import(/* webpackPrefetch: true */ 'idb')
  .then((idb) => {
    const { openDB } = idb;

    dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
      },
    });
  });

const FavoriteRestaurantsIdb = {
  async retrieve(id) {
    if (!id) {
      return null;
    }

    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },

  async list() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },

  async put(restaurant) {
    const { id } = restaurant;
    if (!id) {
      return null;
    }

    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },

  async delete(id) {
    if (!id) {
      return null;
    }

    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteRestaurantsIdb;
