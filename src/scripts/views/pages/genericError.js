export default {
  async render() {
    const $container = document.createElement('div');
    $container.className = 'exception-container';
    $container.innerText = 'Terjadi kesalahan :(';

    return $container;
  },
};
