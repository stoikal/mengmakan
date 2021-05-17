const template = document.createElement('template');
template.innerHTML = `
  <style>
    button.liked {
      color: red;
    }

  </style>

  <button>
    <span>&hearts;</span>
  </button>
`;

class LikeButton extends HTMLElement {
  static get observedAttributes() {
    return ['liked'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this._shadowRoot.querySelector('button');

    this.liked = false;
    this.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('toggleLike'),
      );
    });
  }

  get liked() {
    return this.hasAttribute('liked');
  }

  set liked(value) {
    if (value) {
      this.setAttribute('liked', true);
    } else {
      this.removeAttribute('liked');
    }
  }

  attributeChangedCallback(name) {
    if (this.hasAttribute(name)) {
      this.$button.classList.add('liked');
    } else {
      this.$button.classList.remove('liked');
    }
  }
}

customElements.define('like-button', LikeButton);
