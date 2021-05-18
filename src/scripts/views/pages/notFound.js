export default {
  async render() {
    const $container = document.createElement('div');
    $container.className = 'exception-container';
    $container.innerText = 'Halaman tidak ditemukan.';

    return $container;
  },
};
