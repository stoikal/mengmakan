import { COLOR } from '../globals/style';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    .wrapper {
      display: grid;
      place-items: center;
    }

    .loader {
      border: 0.3em solid ${COLOR.TEXT_BEIGE};
      border-top: 0.3em solid ${COLOR.MAIN_2};
      border-bottom: 0.3em solid ${COLOR.MAIN_2};
      border-radius: 50%;
      width: 2em;
      height: 2em;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  
  <div class="wrapper">
    <div class="loader"></div>
  </div>
`;

class Loader extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  static get observedAttributes() {
    return ['height'];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const wrapper = this._shadowRoot.querySelector('.wrapper');
    wrapper.style.height = this.height;
  }
}

if (!customElements.get('loading-indicator')) {
  customElements.define('loading-indicator', Loader);
}
