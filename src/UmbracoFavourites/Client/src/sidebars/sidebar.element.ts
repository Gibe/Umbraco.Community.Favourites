import { LitElement } from 'lit';
import { css, html, customElement, state } from '@umbraco-cms/backoffice/external/lit';
import './pins.element.js';

@customElement('umbraco-favourites-menu-with-actions')
export default class UmbracoFavouritesMenuWithActionsElement extends LitElement {
  @state() private _isOpen: boolean = true;

  private _toggleAccordion() {
    this._isOpen = !this._isOpen;
  }

  render() {
    const label = "Favourites";

    return html`
      <div
        id="header"
        role="button"
        tabindex="0"
        aria-expanded=${this._isOpen}
        aria-controls="pins-container"
        @click=${this._toggleAccordion}
        @keydown=${this._onKeydown}
      >
        <h3 id="heading-label">${label}</h3>

        <uui-symbol-expand
          class="icon"
          ?open=${this._isOpen}
          aria-hidden="true">
        </uui-symbol-expand>
      </div>

      <div id="pins-container">
        ${this._isOpen ? html`<umbraco-favourites-pins></umbraco-favourites-pins>` : null}
      </div>
    `;
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._toggleAccordion();
    }
  }

  static override styles = css`
    #header {
      display: flex;
      align-items: center;
      padding: 0 var(--uui-size-8);
      height: var(--umb-header-layout-height);
      cursor: pointer;
      user-select: none;
      outline: none;
    }

    #header:hover {
      background-color: var(--uui-color-surface-emphasis);
    }

    #header:focus-visible {
      outline: -webkit-focus-ring-color auto 1px;
      background-color: var(--uui-color-surface-emphasis);
    }

    #header h3 {
      flex-grow: 1;
      margin: 0;
      font-size: 14px;
    }

    .icon {
      flex-shrink: 0;
    }
  `;
}
