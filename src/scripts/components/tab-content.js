class TabContent extends HTMLElement {
  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }
}

customElements.define('tab-content', TabContent);
