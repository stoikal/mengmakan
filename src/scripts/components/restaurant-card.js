import { COLOR } from '../globals/style';
import CONFIG from '../globals/config';
import FavoriteRestaurantsIdb from '../data/favorite-restaurants-idb';

const { BASE_IMAGE_URL } = CONFIG;
const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      background-color: ${COLOR.TEXT_BEIGE};
      box-shadow: 1px 5px 13px 0px rgba(0,0,0,0.2);
      overflow: hidden;
      width: 100%;
    }

    .picture-wrapper {
      position: relative;
      width: 100%;
      height: 10em;
    }
    
    .picture-wrapper > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .picture-wrapper > span {
      background-color: white;
      position: absolute;
      top: 1em;
      left: 0;
      padding: 0.5em 0.5em 0.5em 1.5em;
      background-color: ${COLOR.ACCENT_2};
      color: ${COLOR.TEXT_BEIGE};
    }
    
    .like-button {
      border: none;
      position: absolute;
      top: 0;
      right: 0.2em;
      font-weight: bold;
      font-size: 2.5em;
      color: grey;
      width: 48px;
      height: 48px;
      cursor: pointer;
    }

    .like-button:hover {
      height: 56px;
    }

    .like-button.liked {
      color: ${COLOR.MAIN_1};
    }

    .description-wrapper {
      padding: 1em;
    }
    
    .description-wrapper > span {
      color: ${COLOR.ACCENT_2}
    }

    .description {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      min-width: 0
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .name {
      font-weight: bold;
      color: ${COLOR.TEXT_BLACK}
    }
  </style>
    
  <div class="container">
    <div class="picture-wrapper">
      <img/>
      <span class="city"></span>
      <button class="like-button" aria-label="like">&hearts;</button>
    </div>
    <div class="description-wrapper">
      <span class="rating"></span>
      <p><a class="name"></a></p>
      <p class="description"></p>
    </div>
  </div>
`;

class RestaurantCard extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$image = this._shadowRoot.querySelector('img');
    this.$city = this._shadowRoot.querySelector('.city');
    this.$rating = this._shadowRoot.querySelector('.rating');
    this.$name = this._shadowRoot.querySelector('.name');
    this.$link = this._shadowRoot.querySelector('a');
    this.$description = this._shadowRoot.querySelector('.description');
    this.$likeBtn = this._shadowRoot.querySelector('.like-button');

    this._isLiked = false;
  }

  get details() {
    return JSON.parse(this.getAttribute('details'));
  }

  set details(value) {
    this.setAttribute('details', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['details', 'liked'];
  }

  attributeChangedCallback() {
    this.render();
  }

  async _toggleLiked() {
    const { id } = this.details;
    if (this._isLiked) {
      await FavoriteRestaurantsIdb.delete(id);
      this._isLiked = false;
      this.$likeBtn.classList.remove('liked');
    } else {
      await FavoriteRestaurantsIdb.put(this.details);
      this._isLiked = true;
      this.$likeBtn.classList.add('liked');
    }
  }

  async _initLikeButton() {
    const { id } = this.details;

    const restaurant = await FavoriteRestaurantsIdb.retrieve(id);
    this._isLiked = !!restaurant;

    if (this._isLiked) {
      this.$likeBtn.classList.add('liked');
    } else {
      this.$likeBtn.classList.remove('liked');
    }

    this.$likeBtn.addEventListener('click', this._toggleLiked.bind(this));
  }

  render() {
    const {
      id, pictureId, name, description, city, rating,
    } = this.details;
    const imgSrc = `${BASE_IMAGE_URL}/small/${pictureId}`;

    this.$image.src = imgSrc;
    this.$image.alt = name;
    this.$city.innerText = city;
    this.$rating.innerText = `Rating: ${rating}`;
    this.$name.innerText = name;
    this.$name.href = `/#/detail/${id}`;
    this.$description.innerText = description;

    this._initLikeButton();
  }
}

customElements.define('restaurant-card', RestaurantCard);
