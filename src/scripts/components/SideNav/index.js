import styles from './sideNav.module.css';

export default class SideNav {
  constructor(list) {
    this.list = list || [];
  }

  _renderNav() {
    const nav = document.createElement('nav');
    nav.className = styles.sideNavContainer;
    nav.innerHTML = `
      <div><a href="/"><span>Home</span></a></div>
      <div><a href="#"><span>Favorites</span></a></div>
      <div><a href="https://xlaks.github.io"><span>About Us</span></a></div>
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
    button.id =styles.burgerButton;
    button.innerHTML = `
      <span>&#9776;</span>
    `

    return button;
  }

  _createToggler(...elements) {
    return (event) => {
      event.stopPropagation();

      elements.forEach((el) => {
        el.classList.toggle(styles.open)
      })
    }
  }

  render() {
    const container = document.createElement('div');
    const closeBtnWrapper = document.createElement('div');
    const closeBtn = document.createElement('button');
    const burgerBtn = this._renderButton();
    const overlay = this._renderOverlay();
    const nav = this._renderNav();

    container.className = styles.container;
    closeBtnWrapper.className = styles.closeButton;

    burgerBtn.addEventListener('click', this._createToggler(overlay, nav));
    closeBtn.addEventListener('click', this._createToggler(overlay, nav));
    overlay.addEventListener('click', this._createToggler(overlay, nav));
    
    closeBtn.innerText = '✕';
    closeBtnWrapper.append(closeBtn);
    nav.prepend(closeBtnWrapper);

    container.append(burgerBtn);
    container.append(overlay);
    container.append(nav);

    return container;
  }
}