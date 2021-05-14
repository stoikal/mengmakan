class ColoredSpan extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.attachShadow({ mode: 'open' });

    const span = document.createElement('span');
    const color = this.hasAttribute('bg') ? this.getAttribute('bg') : 'red';

    console.log(color);

    const style = document.createElement('style');
    style.textContent = `
      span {
        background-color: ${color};
        font-size: 3em;
        z-index: 9;
      }
    `;

    this.shadowRoot.append(style, span);
  }
}

customElements.define('colored-span', ColoredSpan);
