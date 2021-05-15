class Router {
  constructor(rootEl, routes) {
    this.$rootEl = rootEl;
    this.routes = routes;
  }

  async _renderPage() {
    const { hash } = window.location;
    const path = `/${hash && hash.split('/')[1]}`;

    this.$rootEl.innerHTML = '';
    this.$rootEl.append(await this.routes[path].render());
  }

  init() {
    window.addEventListener('hashchange', () => {
      this._renderPage();
    });

    this._renderPage();
  }
}

export default Router;
