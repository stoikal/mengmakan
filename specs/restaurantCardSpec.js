import '../src/scripts/components/restaurant-card';
import { itActsAsToggleFavoriteElement } from './contracts/toggleFavoriteElement';

describe('restaurant-card as favorite restaurant toggle', () => {
  const likeButton = document.createElement('restaurant-card');

  itActsAsToggleFavoriteElement(likeButton);
});
