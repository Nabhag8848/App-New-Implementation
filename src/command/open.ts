import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
    IUIKitInteractionParam,
    IUIKitSurfaceViewParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { InfrastructureApp } from "../../InfrastructureApp";
import {
    BlockType,
    IBlock,
    UIKitInteractionType,
    UIKitSurfaceType,
} from "@rocket.chat/apps-engine/definition/uikit";
import {
    InputBlock,
    Block,
    SectionBlock,
    ContextBlock,
    ActionsBlock,
    LayoutBlock,
} from "@rocket.chat/ui-kit";

export class OpenCommand implements ISlashCommand {
    public command = "open";
    public i18nParamsExample = "open_params";
    public i18nDescription = "open_description";
    public providesPreview = false;

    constructor(private readonly app: InfrastructureApp) {
        this.app = app;
    }

    async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const previewBlockWithPreview: LayoutBlock = {
            type: `preview`,
            title: [
                {
                    type: "plain_text",
                    text: "This is External link with text",
                },
            ],
            description: [
                { type: "plain_text", text: "this is preview description" },
            ],
            footer: {
                type: "context",
                elements: [
                    {
                        type: "plain_text",
                        text: "this is preview footer",
                    },
                    {
                        type: "image",
                        imageUrl: "https://picsum.photos/200/300",
                        altText: "altText",
                    },
                ],
            },
            preview: {
                url: "https://picsum.photos/200/300",
            },
            externalUrl: "https://picsum.photos/200/300",
            oembedUrl: "http://www.youtube.com/embed/JEPYYo0-gfc",
        };
        const previewBlock: LayoutBlock = {
            type: `preview`,
            title: [
                {
                    type: "plain_text",
                    text: "This is preview text",
                },
            ],
            description: [
                { type: "plain_text", text: "this is preview description" },
            ],
            footer: {
                type: "context",
                elements: [
                    {
                        type: "plain_text",
                        text: "this is preview footer",
                    },
                    {
                        type: "image",
                        imageUrl: "https://picsum.photos/200/300",
                        altText: "altText",
                    },
                ],
            },
        };

        const previewBlockWithThumb: LayoutBlock = {
            type: `preview`,
            title: [
                {
                    type: "plain_text",
                    text: "This is preview text",
                },
            ],
            description: [
                { type: "plain_text", text: "this is preview description" },
            ],
            footer: {
                type: "context",
                elements: [
                    {
                        type: "plain_text",
                        text: "this is preview footer",
                    },
                    {
                        type: "image",
                        imageUrl: "https://picsum.photos/200/300",
                        altText: "altText",
                    },
                ],
            },
            thumb: {
                url: "https://picsum.photos/200/300",
                dimensions: {
                    width: 200,
                    height: 300,
                },
            },
        };

        const channelSelect: ActionsBlock = {
            type: "actions",
            elements: [
                {
                    type: "multi_users_select",
                    appId: this.app.getID(),
                    blockId: "channels_select",
                    actionId: "chanel_select_action",
                },
            ],
        };
        const date: InputBlock = {
            type: "input",
            label: {
                type: "plain_text",
                text: "date label",
            },
            element: {
                type: "datepicker",
                placeholder: {
                    type: "plain_text",
                    text: "dd/mm/yyyy",
                },
                appId: this.app.getID(),
                blockId: "blockIdDate",
                actionId: "actionIdDate",
            },
        };
        const block: InputBlock = {
            type: "input",
            label: {
                type: "plain_text",
                text: "label text",
            },
            element: {
                type: "plain_text_input",
                placeholder: {
                    type: "plain_text",
                    text: "this is placeholder",
                },
                appId: this.app.getID(),
                blockId: "blockId",
                actionId: "actionId",
                initialValue: "initialValue",
                multiline: false,
            },
        };

        const overflow: SectionBlock = {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "",
            },
            accessory: {
                type: "overflow",
                appId: this.app.getID(),
                blockId: "block-id",
                actionId: "action-id",
                options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Connect to Workspace",
                        },
                        value: "value-0",
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Change Workspace",
                        },
                        value: "value-1",
                    },
                ],
            },
        };

        const image: SectionBlock = {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Nabhag's Notion",
            },
            accessory: {
                type: "image",
                imageUrl: "https://picsum.photos/200/300",
                altText: "cute cat",
            },
        };

        const imageWithSection: ContextBlock = {
            type: "context",
            elements: [
                {
                    type: "plain_text",
                    text: "",
                },
                {
                    type: "image",
                    imageUrl: "https://picsum.photos/200/300",
                    altText: "An image",
                },
                {
                    type: "mrkdwn",
                    text: "*Nabhag's Notion*",
                },
            ],
        };

        const param2: IUIKitInteractionParam = {
            triggerId: context.getTriggerId() as string,
        };

        await modify.getUiController().openSurfaceView(
            {
                id: "viewId",
                type: UIKitSurfaceType.MODAL,
                title: {
                    type: "plain_text",
                    text: "This is Title",
                },
                blocks: [
                    channelSelect,
                    date,
                    overflow,
                    imageWithSection,
                    image,
                    previewBlock,
                    previewBlockWithThumb,
                    previewBlockWithPreview,
                ] as Block[],
            },
            param2,
            context.getSender()
        );
    }
}
