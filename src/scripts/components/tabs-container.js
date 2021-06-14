const template = document.createElement('template');
template.innerHTML = `
  <style>
    .tab-title-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    }

    .tab-title {
      height: 3em;
      border: none;
      border-bottom: 4px solid #bdbdbd;
      background: transparent;
      font-size: 1em;
      cursor: pointer;
    }

    .tab-title:hover {
      background: rgba(100, 100, 100, 0.2);
    }

    .tab-title.active {
      font-weight: bold;
      border-bottom: 4px solid black;
    }

    ::slotted(tab-content) {
      display: none
    }

    ::slotted(tab-content.active) {
      display: block
    }

  </style>

  <div class="tab-title-container">
  </div>
  <slot>/slot>

`;

// TODO migrate to LitElement
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
    const currentIndex = index.toString();
    const $tabTitle = document.createElement('button');

    $tabTitle.textContent = $tabContent.title || currentIndex;
    $tabTitle.className = 'tab-title';
    $tabTitle.addEventListener('click', () => {
      this.activeTab = currentIndex;
    });

    $tabContent.setAttribute('index', currentIndex);
    if (currentIndex === this.activeTab) {
      $tabContent.classList.add('active');
      $tabTitle.classList.add('active');
    }

    this.$tabTitleContainer.append($tabTitle);
  }

  connectedCallback() {
    const $tabContentList = this.querySelectorAll('tab-content');
    if ($tabContentList.length) {
      Array
        .from($tabContentList)
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
      this._toggleActiveTabClass(newVal);
    }
  }

  _toggleActiveTabClass(activeIndex) {
    const $tabTitleList = this._shadowRoot.querySelectorAll('.tab-title');
    const $tabContentList = this.querySelectorAll('tab-content');

    Array
      .from($tabContentList)
      .forEach((el, i) => {
        if (el.getAttribute('index') === activeIndex) {
          el.classList.add('active');
          $tabTitleList[i].classList.add('active');
        } else {
          el.classList.remove('active');
          $tabTitleList[i].classList.remove('active');
        }
      });
  }
}

customElements.define('custom-tabs', CustomTabs);
