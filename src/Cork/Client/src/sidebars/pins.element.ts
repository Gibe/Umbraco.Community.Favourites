import {
  LitElement,
  css,
  html,
  customElement,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_CURRENT_USER_CONTEXT, UmbCurrentUserModel } from "@umbraco-cms/backoffice/current-user";

@customElement("pins")
export class Pins extends UmbElementMixin(LitElement) {
  @state()
  private _contextCurrentUser?: UmbCurrentUserModel;

  constructor() {
    super();

    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (currentUserContext) => {
      // When we have the current user context
      // We can observe properties from it, such as the current user or perhaps just individual properties
      // When the currentUser object changes we will get notified and can reset the @state properrty
      this.observe(
        currentUserContext?.currentUser,
        (currentUser) => {
          this._contextCurrentUser = currentUser;
        },
        "_contextCurrentUser"
      );
    });
  }

  render() {
    return html`
      <h2>Hello ${this._contextCurrentUser?.name || "there"}!</h2>
    `;
  }

  static styles = [
    css`
      :host {
        display: grid;
        gap: var(--uui-size-layout-1);
        padding: var(--uui-size-layout-1);
        grid-template-columns: 1fr 1fr 1fr;
      }

      uui-box {
        margin-bottom: var(--uui-size-layout-1);
      }

      h2 {
        margin-top: 0;
      }

      .wide {
        grid-column: span 3;
      }
    `,
  ];
}

export default Pins;

declare global {
  interface HTMLElementTagNameMap {
    "pins": Pins;
  }
}
