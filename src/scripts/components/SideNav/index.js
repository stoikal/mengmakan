import styles from './sideNav.module.css';

export default class SideNav {
  constructor(list) {
    this.list = list || [];
  }

  _renderNav() {
    const nav = document.createElement('nav');
    nav.className = styles.sideNavContainer;
    nav.innerHTML = `
      <div><a href="/">Home</a></div>
      <div><a href="/">Favorites</a></div>
      <div><a href="/">Home</a></div>
    `
    nav.addEventListener('click', (e) => e.stopPropagation())
    
    return nav;
  }

  _renderOverlay() {
    const overlay = document.createElement('div');
    overlay.className = styles.overlay;

    return overlay;
  }

  _renderButton() {
    const button = document.createElement('button');
    button.className =styles.button;
    button.innerHTML = `
      <span>hello</span>
    `

    return button;
  }

  render() {
    const container = document.createElement('div');
    const button = this._renderButton();
    const overlay = this._renderOverlay();
    const nav = this._renderNav();

    container.className = styles.container;

    button.addEventListener('click', (e) => {
      e.stopPropagation()
      overlay.classList.toggle(styles.open)
      nav.classList.toggle(styles.open)
    });
    
    overlay.addEventListener('click', (e) => {
      e.stopPropagation()
      overlay.classList.toggle(styles.open)
      nav.classList.toggle(styles.open)
    });

    container.append(button);
    container.append(overlay);
    container.append(nav);

    return container;
  }
}