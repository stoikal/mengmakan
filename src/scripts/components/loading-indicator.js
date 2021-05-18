const template = document.createElement('template');

template.innerHTML = `
  <style>
    .wrapper {
      display: grid;
      place-items: center;
    }

    .loader {
      border: 0.3em solid rgba(0,0,0,0);
      border-top: 0.3em solid black;
      border-bottom: 0.3em solid black;
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
  static get observedAttributes() {
    return ['height'];
  }

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

  attributeChangedCallback() {
    const $wrapper = this._shadowRoot.querySelector('.wrapper');
    $wrapper.style.height = this.height;
  }
}

customElements.define('loading-indicator', Loader);
