import genericError from '../views/pages/genericError';
import notFound from '../views/pages/notFound';

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
    let pageContent;

    this._renderLoadingIndicator();

    try {
      pageContent = await (this.routes[path] || notFound).render({
        renderPage: this._renderPage.bind(this),
        path,
        $rootEl: this.$rootEl,
      });
    } catch {
      pageContent = await genericError.render();
    }

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
