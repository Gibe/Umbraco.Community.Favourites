import { LitElement } from 'lit';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import './pins.element.js';

@customElement('cork-menu-with-actions')
export default class CorkMenuWithActionsElement extends LitElement {
  @state() private _isOpen: boolean = true;

  private _toggleAccordion() {
    this._isOpen = !this._isOpen;
  }

  render() {
    const label = "Favourites";
    return html`
      <div id="header">
        <h3>${label}</h3>
        <uui-button
          aria-expanded=${this._isOpen}
          aria-label="Toggle Favourites"
          id="cork-accordion-btn"
          @click=${this._toggleAccordion}
        >
          <uui-symbol-expand ?open=${this._isOpen}></uui-symbol-expand>
        </uui-button>
      </div>

      <div id="pins-container">
        ${this._isOpen ? html`<cork-pins></cork-pins>` : null}
      </div>
    `;
  }

  static override styles = css`
    #header {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    #header > :first-child {
      flex-grow: 1;
    }

    #header h3 {
      display: flex;
      align-items: center;
      height: var(--umb-header-layout-height);
      margin: 0;
      padding: var(--uui-size-4) var(--uui-size-8);
      box-sizing: border-box;
      font-size: 14px;
    }

    #header #cork-accordion-btn {
      align-self: stretch;
    }
  `;
}