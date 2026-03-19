import { LitElement, html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from "@umbraco-cms/backoffice/document";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { client } from "../api/client.gen.js";

interface FavouriteItem {
  nodeKey: string;
  nodeName: string;
  published: boolean;
}

@customElement("cork-pin-workspace-action")
export default class CorkPinWorkspaceActionElement extends UmbElementMixin(LitElement) {
  @state()
  private _isPinned = false;

  @state()
  private _loading = true;

  #workspaceContext?: typeof UMB_DOCUMENT_WORKSPACE_CONTEXT.TYPE;
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor() {
    super();

    this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (ctx) => {
      this.#workspaceContext = ctx;
      this.#checkPinStatus();
    });

    // Listen to the custom event triggered by workspaceaction.action.ts on success
    window.addEventListener("cork-favourites-updated", () => this.#checkPinStatus());
  }

  async #checkPinStatus() {
    const unique = this.#workspaceContext?.getUnique();
    if (!unique) {
      this._loading = false;
      return;
    }

    const { data } = await client.get({
      url: "/umbraco/cork/api/v1/favourites",
      security: [{ scheme: "bearer", type: "http" }],
    });

    const favourites = (data as FavouriteItem[]) ?? [];
    this._isPinned = favourites.some((f) => f.nodeKey === unique);
    this._loading = false;
  }

  async #togglePin() {
    const unique = this.#workspaceContext?.getUnique();
    const isNew = this.#workspaceContext?.getIsNew();

    if (isNew || !unique) {
      this.#notificationContext?.peek("warning", {
        data: { headline: "Save first", message: "You cannot pin an unsaved document." },
      });
      return;
    }

    this._loading = true;

    if (this._isPinned) {
      const { error } = await client.delete({
        url: "/umbraco/cork/api/v1/favourites/{nodeKey}",
        path: { nodeKey: unique },
        security: [{ scheme: "bearer", type: "http" }],
      });

      if (!error) {
        this.#notificationContext?.peek("positive", {
          data: { headline: "Removed from favourites", message: "" },
        });
        window.dispatchEvent(new CustomEvent("cork-favourites-updated"));
      }
    } else {
      const { error } = await client.post({
        url: "/umbraco/cork/api/v1/favourites",
        body: { nodeKey: unique },
        security: [{ scheme: "bearer", type: "http" }],
      });

      if (!error) {
        this.#notificationContext?.peek("positive", {
          data: { headline: "Added to favourites", message: "" },
        });
        window.dispatchEvent(new CustomEvent("cork-favourites-updated"));
      }
    }
  }

  render() {
    return html`
      <uui-button
        look="secondary"
        label=${this._isPinned ? "Unpin" : "Pin"}
        @click=${this.#togglePin}
        ?disabled=${this._loading}
      >
        ${this._isPinned ? "Unpin" : "Pin"}
      </uui-button>
    `;
  }
}
