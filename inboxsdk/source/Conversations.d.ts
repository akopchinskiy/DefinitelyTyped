declare namespace InboxSDK.Conversations {

    export function registerThreadViewHandler(handler: (threadView: ThreadView) => void): void;

    export function registerMessageViewHandler(handler: (messageView: MessageView) => void): void;

    export function registerMessageViewHandlerAll(handler: (messageView: MessageView) => void): void;

    export function registerFileAttachmentCardViewHandler(handler: (attachmentCardView: AttachmentCardView) => void): void;

    export interface ThreadView {
        addSidebarContentPanel(contentPanelDescriptor: ContentPanelDescriptor): ContentPanelView;

        getMessageViews(): MessageView[];

        getMessageViewsAll(): MessageView[];

        getSubject(): string;

        /** @deprecated */
        getThreadID(): string;

        getThreadIDAsync(): Promise<string>;


        // TODO: Events

        destroyed: boolean;
    }

    export interface MessageView {
        addAttachmentCardView(cardOptions: AttachmentCardOptions): AttachmentCardView;

        addAttachmentCardView(cardOptions: AttachmentCardNoPreviewOptions): AttachmentCardView;

        addaAttachmentsToolbarButton(buttonOtions: AttachmentsToolbarButtonDescriptor): void;

        addToolbarButton(options: MessageViewToolbarButtonDescriptor): void;

        getBodyElement(): HTMLElement;

        /** @deprecated */
        getMessageID(): string;

        getMessageIDAsync(): Promise<string>;

        getFileAttachmentCardViews(): AttachmentCardView[];

        isElementInQuotedArea(): boolean;

        isLoaded(): boolean;

        getLinksInbody(): MessageViewLinkDescriptor[];

        getSender(): Contact;

        getRecipients(): Contact[];

        getRecipientsFull(): Promise<Contact[]>;

        getThreadView(): ThreadView;

        getDateString(): string;

        addAttachmentIcon(iconDescriptor: MessageAttachmentIconDescriptor): void;

        //addAttachmentIcon(iconDescriptor: Stream<MessageAttachmentIconDescriptor>): void;

        getViewState(): MessageViewViewStates;

        // TODO: Events

        destroyed: boolean;
    }

    export interface ContentPanelView {
        remove(): void;

        // TODO: Events

        destroyed: boolean;
    }

    export interface AttachmentCardView {
        getAttachmentType(): string;

        addButton(buttonDescriptor: CustomButtonDescriptor): void;

        getTitle(): string;

        getDownloadURL(): Promise<string>;

        getMessageView(): void; // TODO: null is not a type?
        getMessageView(): MessageView;

        // TODO: Events

        destroyed: boolean;
    }

// ConversationsDescriptors

    export interface AttachmentCardOptions {
        title: string;
        description: string;
        previewUrl: string;
        previewThumbnailUrl: string;
        failoverPreviewIconUrl: string;
        previewOnClick: (event: PreviewClickEvent) => void;
        fileIconImageUrl: string;
        buttons: DownloadButtonDescriptor[] | CustomButtonDescriptor[];
        foldColor?: string; //: #BEBEBE
        mimeType?: string; //: null
    }

    export interface AttachmentCardNoPreviewOptions {
        title: string;
        description: string;
        previewUrl: string;
        iconThumbnailUrl: string;
        previewOnClick: (event: PreviewClickEvent) => void;
        fileIconImageUrl: string;
        buttons: DownloadButtonDescriptor[] | CustomButtonDescriptor[];
        foldColor?: string; //: #BEBEBE
    }

    export interface PreviewClickEvent {
        attachmentCardView: AttachmentCardView;

        preventDefault(): void;
    }

    export interface ContentPanelDescriptor {
        el: HTMLElement;
        title: string;
        iconUrl: string;
        orderHint?: number; //: 0
    }

    export interface DownloadButtonDescriptor {
        downloadUrl: string;
        onClick: (event: DownloadButtonClickEvent) => void;
        openInNewTab?: boolean; //: false
    }

    export interface DownloadButtonClickEvent {
        // FIXME: testme, undocumented
    }

    export interface CustomButtonDescriptor {
        iconUrl: string;
        tooltip: string;
        onClick: (event: AttachmentCardClickEvent) => void;
    }

    export interface AttachmentCardClickEvent {
        // FIXME: testme, AttachmentCardClickEvent not documented
        getDownloadURL: () => string
    }

    export interface AttachmentsToolbarButtonDescriptor {
        tooltip: string;
        iconUrl: string;
        onClick: (event: AttachmentsToolbarButtonEvent) => void;
    }

    export interface AttachmentsToolbarButtonEvent {
        attachmentCardViews: AttachmentCardView[];
    }

    export interface MessageViewLinkDescriptor {
        text: string;
        html: string;
        element: HTMLElement;
        href: string;
        isInQuotedArea: boolean;
    }

    export interface MessageAttachmentIconDescriptor {
        iconUrl: string;
        iconClass?: string; //: 'MODIFIER'
        tooltip: string;
        onClick: () => any; // TODO: check any?
    }

    export interface MessageViewToolbarButtonDescriptor {
        section: MessageViewToolbarSectionNames;
        title: string;
        iconUrl: string;
        iconClass?: string; //: ''
        onClick: () => any; // TODO: check any?
        orderHint: () => any; // TODO: check any?
    }

    export enum MessageViewViewStates {
        HIDDEN,
        COLLAPSED,
        EXPANDED
    }

    export enum MessageViewToolbarSectionNames {
        MORE
    }
}
