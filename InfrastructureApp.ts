import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { OpenCommand } from "./src/command/open";
import {
    IUIKitResponse,
    UIKitBlockInteractionContext,
    UIKitInteractionType,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";

export class InfrastructureApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead
    ): Promise<void> {
        const app = this;
        await configuration.slashCommands.provideSlashCommand(
            new OpenCommand(app)
        );
    }

    async executeBlockActionHandler(
        context: UIKitBlockInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        console.log(context.getInteractionData().actionId);
        return context.getInteractionResponder().successResponse();

    }
    async executeViewClosedHandler(
        context: UIKitViewCloseInteractionContext,
        read: IRead,
        http: IHttp,
        persistence: IPersistence,
        modify: IModify
    ): Promise<IUIKitResponse> {
        await modify.getUiController().setViewError(
            {
                viewId: "viewId",
                errors: {
                    blockId: "blockId",
                },
            },
            { triggerId: context.getInteractionData().triggerId as string },
            context.getInteractionData().user
        );

        return context.getInteractionResponder().successResponse();
    }
}
