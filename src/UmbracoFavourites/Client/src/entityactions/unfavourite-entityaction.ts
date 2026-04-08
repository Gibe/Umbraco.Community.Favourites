import {
  UmbEntityActionBase,
} from "@umbraco-cms/backoffice/entity-action";
import type { UmbEntityActionArgs } from "@umbraco-cms/backoffice/entity-action";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { client } from "../api/client.gen.js";

export default class UmbracoUnfavouriteEntityAction extends UmbEntityActionBase<never> {
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
    super(host, args);
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (ctx) => {
      this.#notificationContext = ctx;
    });
  }

  override async execute(): Promise<void> {
    const nodeKey = this.args.unique;
    if (!nodeKey) return;

    const { error } = await client.delete({
      url: "/umbraco/favourites/api/v1/favourites/{nodeKey}",
      path: { nodeKey },
      security: [{ scheme: "bearer", type: "http" }],
    });

    if (!error) {
      this.#notificationContext?.peek("positive", {
        data: { headline: "Removed from favourites", message: "" },
      });
      window.dispatchEvent(new CustomEvent("umbraco-favourites-updated"));
    } else {
      this.#notificationContext?.peek("danger", {
        data: { headline: "Failed to remove favourite", message: "" },
      });
    }
  }
}
