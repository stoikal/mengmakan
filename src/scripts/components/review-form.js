const template = document.createElement('template');
template.innerHTML = `
  <style>

    form {
      padding: 1em 0.5em;
    }

    input {
      margin-bottom: 0.5em;
      line-height: 2em;
      font-size: 1em;
    }

    textarea {
      margin-bottom: 0.5em;
      width: 100%;
      max-width: 600px;
      line-height: 1.5em;
      font-size: 1em;
    }

    button {
      min-height: 48px;
      min-width: 56px;
      padding: 1em;
    }

  </style>

  <form>
    <input id="name" type="text" placeholder="Nama"/>
    <br />
    <textarea id="review" placeholder="Review" rows="5"></textarea>
    <br />
    <button type="submit" disabled>submit</submit>
    
  </form>
`;

class ReviewForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._formValues = {
      name: '',
      review: '',
    };
  }

  _evaluateSubmitButton() {
    const $button = this._shadowRoot.querySelector('button');
    const { name, review } = this._formValues;

    if (name && review) {
      $button.removeAttribute('disabled');
    } else if (!$button.hasAttribute('disabled')) {
      $button.setAttribute('disabled', '');
    }
  }

  _clearForm() {
    const $input = this._shadowRoot.querySelector('input');
    const $textarea = this._shadowRoot.querySelector('textarea');

    this._formValues = {
      name: '',
      review: '',
    };

    $input.value = '';
    $textarea.value = '';
  }

  connectedCallback() {
    const $form = this._shadowRoot.querySelector('form');

    $form.addEventListener('change', (e) => {
      const { id, value } = e.target;

      this._formValues = {
        ...this._formValues,
        [id]: value,
      };

      this._evaluateSubmitButton();
    });

    $form.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        if (typeof this.onSubmit === 'function') {
          await this.onSubmit({
            name: this._formValues.name,
            review: this._formValues.review,
          });
        }
        this._clearForm();
      } catch (err) {
        // TODO: catch error
      }
    });
  }
}

customElements.define('review-form', ReviewForm);
