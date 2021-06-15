export default class FavoriteRestaurantToggler {
  constructor({
    trigger,
    restaurant,
    favoriteRestaurants,
    onToggle,
  }) {
    this._trigger = trigger;
    this._FavRestaurants = favoriteRestaurants;
    this._restaurant = restaurant;
    this._onToggleCb = onToggle;

    this._init();
  }

  async _isRestaurantExist(id) {
    const restaurant = await this._FavRestaurants.retrieve(id);
    return !!restaurant;
  }

  async _addToFavorites() {
    const response = await this._FavRestaurants.put(this._restaurant);
    return response;
  }

  async _removeFromFavorites() {
    const { id } = this._restaurant;
    const response = await this._FavRestaurants.delete(id);
    return response;
  }

  async _toggleFavorite() {
    const { id } = this._restaurant;
    let response;

    if (await this.isRestaurantExist(id)) {
      response = await this._FavRestaurants.delete(id);
    } else {
      response = await this._FavRestaurants.put(this._restaurant);
    }

    this._onToggleCb(response);
  }

  async _init() {
    this._trigger.addEventListener('toggleLike', this._toggleFavorite.bind(this));
  }
}
