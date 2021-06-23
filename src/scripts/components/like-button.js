const template = document.createElement('template');
template.innerHTML = `
  <style>
    button {
      border-radius: 50%;
      border: 1px solid black;
      font-size: 2.5em;
      height: 60px;
      width: 60px;
      padding: 0;
      cursor: pointer;
      position: fixed;
      bottom: 1em;
      right: 8vw;
      color: grey;
    }

    button.liked {
      color: red;
    }

  </style>

  <button id="like-button">
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
    this.$button.addEventListener('click', () => {
      const eventName = this.liked ? 'unlike' : 'like';

      this.dispatchEvent(
        new CustomEvent(eventName),
      );
    });

    this.liked = false;
  }

  get liked() {
    return this.hasAttribute('liked');
  }

  set liked(value) {
    if (value) {
      this.setAttribute('liked', '');
    } else {
      this.removeAttribute('liked');
    }
  }

  get button() {
    return this.$button;
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
