import {
  UmbEntityActionBase,
} from "@umbraco-cms/backoffice/entity-action";
import type { UmbEntityActionArgs } from "@umbraco-cms/backoffice/entity-action";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
import { client } from "../api/client.gen.js";

export default class FavouriteEntityAction extends UmbEntityActionBase<never> {
  #notificationContext?: typeof UMB_NOTIFICATION_CONTEXT.TYPE;

  constructor(host: UmbControllerHost, args: UmbEntityActionArgs<never>) {
    super(host, args);
    this.consumeContext(UMB_NOTIFICATION_CONTEXT, (ctx) => {
      this.#notificationContext = ctx;
    });
  }

  override async execute(): Promise<void> {
    const { error } = await client.post({
      url: "/umbraco/favourites/api/v1/favourites",
      body: { nodeKey: this.args.unique },
      security: [{ scheme: "bearer", type: "http" }],
    });

    if (!error) {
      this.#notificationContext?.peek("positive", {
        data: { headline: "Added to favourites", message: "" },
      });
      window.dispatchEvent(new CustomEvent("favourites-updated"));
    } else {
      this.#notificationContext?.peek("danger", {
        data: { headline: "Failed to add favourite", message: "" },
      });
    }
  }
}
