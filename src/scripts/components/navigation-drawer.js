const template = document.createElement('template');

template.innerHTML = `
  <style>
    .container {
      display: block;
    }
    
    .container button {
      border: none;
      padding: none;
      border-radius: 50%;
      height: 48px;
      width: 48px;
      font-size: 1.5em;
      color: white;
      background-color: transparent;
      cursor: pointer;
    }
  
    .overlay {
      display: none;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      transition: all 200ms;
      background-color: rgba(255, 255, 255, 0.4);
    }
    
    .overlay.open {
      display: block;
    }

    nav {
      --sidenav-width: 300px;
      z-index: 1;
      position: fixed;
      background-color: black;
      top: 0;
      right: 0;
      max-width: 100%;
      width: var(--sidenav-width);
      height: 100vh;
      transform: translateX(var(--sidenav-width));
      transition: transform 200ms;
    }
    
    nav.open {
      transform: translateX(0);
    }
    
    nav a {
      display: inline-block;
      min-width: 48px;
      min-height: 48px;
      color: beige;
      text-decoration: none;
    }
    
    nav span {
      line-height: 48px;
    }
    
    nav > div:first-child {
      text-align: right;
      padding: 0 1.5em;
    }
    
    nav > div:not(:first-child) {
      padding: 0 1.5em 0.5em;
    }
    
    @media screen and (min-width: 800px) {
      #burgerButton {
        display: none;
      }
    
      .container {
        display: none;
      }
     }
  </style>

  <div class="container">
    <button class="burger-button">&#9776;</button>
    <div class="overlay"></div>
    <nav>
      <div>
        <button class="close-button">✕</button>
      </div>
    </nav>
  </div>
`;

class NavDrawer extends HTMLElement {
  static get observedAttributes() {
    return ['links'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$nav = this._shadowRoot.querySelector('nav');
    this.$overlay = this._shadowRoot.querySelector('.overlay');
    this.$burgerBtn = this._shadowRoot.querySelector('.burger-button');
    this.$closeBtn = this._shadowRoot.querySelector('.close-button');

    this.$burgerBtn.addEventListener('click', this._toggleDrawer.bind(this));
    this.$overlay.addEventListener('click', this._toggleDrawer.bind(this));
    this.$closeBtn.addEventListener('click', this._toggleDrawer.bind(this));
  }

  set links(value) {
    console.log('set links', value);
    // this.setAttribute('links', JSON.stringify(value));
  }

  get links() {
    return JSON.parse(this.getAttribute('links'));
  }

  set test123(value) {
    console.log('set test');
    this.setAttribute('test', value);
  }

  connectedCallback() {
    console.log('connected');
  }

  attributeChangedCallback() {
    console.log('attr changed');
    this.render();
  }

  _toggleDrawer() {
    this.$nav.classList.toggle('open');
    this.$overlay.classList.toggle('open');
  }

  render() {
    Object.entries(this.links).forEach(([label, href]) => {
      const $link = document.createElement('div');
      $link.innerHTML = `
        <a href=${href}>${label}</a>
      `;

      this.$nav.append($link);
    });
  }
}

customElements.define('navigation-drawer', NavDrawer);
