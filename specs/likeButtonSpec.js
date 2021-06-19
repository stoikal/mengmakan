import '../src/scripts/components/like-button';
import { itActsAsToggleFavoriteElement } from './contracts/toggleFavoriteElement';

describe('like-button as favorite restaurant toggle', () => {
  const likeButton = document.createElement('like-button');

  itActsAsToggleFavoriteElement(likeButton);
});
