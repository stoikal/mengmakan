import STYLE from '../globals/style';
import CONFIG from '../globals/config';

const { COLOR } = STYLE;
const { BASE_IMAGE_URL } = CONFIG;
const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      border-radius: 8px;
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
    
    .description-wrapper {
      padding: 1em;
      height: 10em;
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
  </style>
    
  <div class="container">
    <div class="picture-wrapper">
      <img/>
      <span class="city"></span>
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
  }

  get details() {
    return JSON.parse(this.getAttribute('details'));
  }

  set details(value) {
    this.setAttribute('details', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['details'];
  }

  attributeChangedCallback() {
    this.render();
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
  }
}

if (!customElements.get('restaurant-card')) {
  customElements.define('restaurant-card', RestaurantCard);
}
