class App {
  constructor(opts) {
    const {
      root,
      routes,
    } = opts;



  }

  _renderPage() {
    const path = 'detail';

  }

  init() {
    window.addEventListener('hashchange', () => {
      this._renderPage();
    });

    this._renderPage();
  }


};
