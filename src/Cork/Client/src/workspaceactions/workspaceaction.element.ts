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

// Shared helpers for favourites API operations. These can be reused by other
// workspace-related code (e.g. actions) to avoid duplicating logic.
async function fetchFavourites(): Promise<FavouriteItem[]> {
  const { data } = await client.get({
    url: "/umbraco/cork/api/v1/favourites",
    security: [{ scheme: "bearer", type: "http" }],
  });

  return (data as FavouriteItem[]) ?? [];
}

async function updateFavouriteOnServer(options: {
  nodeKey: string;
  currentlyPinned: boolean;
  notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;
}): Promise<boolean> {
  const { nodeKey, currentlyPinned, notificationContext } = options;

  if (currentlyPinned) {
    const { error } = await client.delete({
      url: "/umbraco/cork/api/v1/favourites/{nodeKey}",
      path: { nodeKey },
      security: [{ scheme: "bearer", type: "http" }],
    });

    if (!error) {
      notificationContext?.peek("positive", {
        data: { headline: "Removed from favourites", message: "" },
      });
      window.dispatchEvent(new CustomEvent("cork-favourites-updated"));
      return true;
    }

    return false;
  }

  const { error } = await client.post({
    url: "/umbraco/cork/api/v1/favourites",
    body: { nodeKey },
    security: [{ scheme: "bearer", type: "http" }],
  });

  if (!error) {
    notificationContext?.peek("positive", {
      data: { headline: "Added to favourites", message: "" },
    });
    window.dispatchEvent(new CustomEvent("cork-favourites-updated"));
    return true;
  }

  return false;
}

@customElement("cork-pin-workspace-action")
export default class CorkPinWorkspaceActionElement extends UmbElementMixin(LitElement) {
  @state()
  private _isPinned = false;

  @state()
  private _loading = true;

  #workspaceContext?: typeof UMB_DOCUMENT_WORKSPACE_CONTEXT.TYPE;
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;
  #onFavouritesUpdated = () => this.#checkPinStatus();

  constructor() {
    super();

    this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (ctx) => {
      this.#workspaceContext = ctx;
      this.#checkPinStatus();
    });
  }

    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (ctx) => {
      this.#notificationContext = ctx;
    });

  connectedCallback() {
    super.connectedCallback?.();
    window.addEventListener("cork-favourites-updated", this.#onFavouritesUpdated);
  }

  disconnectedCallback() {
    window.removeEventListener("cork-favourites-updated", this.#onFavouritesUpdated);
    super.disconnectedCallback?.();
  }

  async #checkPinStatus() {
    const unique = this.#workspaceContext?.getUnique();
    if (!unique) {
      this._loading = false;
      return;
    }

    const favourites = await fetchFavourites();
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

    const success = await updateFavouriteOnServer({
      nodeKey: unique,
      currentlyPinned: this._isPinned,
      notificationContext: this.#notificationContext,
    });

    if (success) {
      this._isPinned = !this._isPinned;
    }

    this._loading = false;
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
