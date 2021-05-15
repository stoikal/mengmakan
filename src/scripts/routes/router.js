class Router {
  constructor(rootEl, routes) {
    this.$rootEl = rootEl;
    this.routes = routes;
  }

  _clearChildren() {
    while (this.$rootEl.firstChild) {
      this.$rootEl.removeChild(this.$rootEl.lastChild);
    }
  }

  _renderLoadingIndicator() {
    const loader = document.createElement('loading-indicator');
    loader.height = '40vh';
    this._clearChildren();
    this.$rootEl.append(loader);
  }

  async _renderPage() {
    const { hash } = window.location;
    const path = `/${hash && hash.split('/')[1]}`;

    this._renderLoadingIndicator();
    const pageContent = await this.routes[path].render();

    this._clearChildren();
    this.$rootEl.append(pageContent);
  }

  init() {
    window.addEventListener('hashchange', () => {
      this._renderPage();
    });

    this._renderPage();
  }
}

export default Router;
