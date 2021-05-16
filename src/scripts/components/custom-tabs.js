const template = document.createElement('template');
template.innerHTML = `
  <style>
    .tab-title-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    }

    tab-content {
      display: none;
    }

    tab-content.active {
      display: block;
    }

  </style>

  <div class="tab-title-container">
  </div>


`;

class CustomTabs extends HTMLElement {
  static get observedAttributes() {
    return ['active-tab'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.append(template.content.cloneNode(true));

    this.$tabTitleContainer = this._shadowRoot.querySelector('.tab-title-container');

    this.activeTab = '0';
  }

  _createTab($tabContent, index) {
    if ($tabContent.tagName === 'TAB-CONTENT') {
      const currentIndex = index.toString();
      const $tabTitle = document.createElement('button');
      $tabTitle.textContent = $tabContent.title || currentIndex;
      $tabTitle.addEventListener('click', () => {
        this.activeTab = currentIndex;
      });

      $tabContent.setAttribute('index', currentIndex);
      if (currentIndex === this.activeTab) {
        $tabContent.classList.add('active');
      }

      this.$tabTitleContainer.append($tabTitle);
      this._shadowRoot.append($tabContent);
    }
  }

  connectedCallback() {
    if (this.children.length) {
      Array
        .from(this.children)
        .forEach(this._createTab.bind(this));
    }
  }

  get activeTab() {
    return this.getAttribute('active-tab');
  }

  set activeTab(value) {
    this.setAttribute('active-tab', value);
  }

  attributeChangedCallback(name, prevVal, newVal) {
    if (name === 'active-tab') {
      this._showContent(newVal);
    }
  }

  _showContent(activeIndex) {
    Array
      .from(this._shadowRoot.querySelectorAll('tab-content'))
      .forEach((el) => {
        if (el.getAttribute('index') === activeIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
  }
}

customElements.define('custom-tabs', CustomTabs);
