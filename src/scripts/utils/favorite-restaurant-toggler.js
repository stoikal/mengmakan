import noop from './noop';

export default class FavoriteRestaurantToggler {
  constructor({
    trigger,
    restaurant,
    favoriteRestaurants,
    onToggle = noop,
  }) {
    this._trigger = trigger;
    this._FavRestaurants = favoriteRestaurants;
    this._restaurant = restaurant;
    this._onToggleCb = onToggle;
  }

  async _isRestaurantExist() {
    const { id } = this._restaurant;
    const restaurant = await this._FavRestaurants.retrieve(id);
    return !!restaurant;
  }

  async _addToFavorites() {
    const response = await this._FavRestaurants.put(this._restaurant);
    this._trigger.liked = true;
    this._onToggleCb();
    return response;
  }

  async _removeFromFavorites() {
    const { id } = this._restaurant;
    const response = await this._FavRestaurants.delete(id);
    this._trigger.liked = false;
    this._onToggleCb();
    return response;
  }

  async init() {
    this._trigger.liked = await this._isRestaurantExist();
    this._trigger.addEventListener('like', this._addToFavorites.bind(this));
    this._trigger.addEventListener('unlike', this._removeFromFavorites.bind(this));
  }
}
