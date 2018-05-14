// Type definitions for InboxSDK
// Project: https://www.inboxsdk.com/
// Definitions by: Raphaël Doursenaud <rdoursenaud@gpcsolutions.fr>
// And also by: Artem Kopchinskiy <a.kopchinskiy@apollo4u.net>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*
 * Copyright (c) 2016 GPC.solutions
 */

export function load(version: string, appId?: string, opts?: LoadOptions): Promise<any>;

export function loadScript(url: string): Promise<void>;

// Undocummented
export const IMPL_VERSION: string;
export const LOADER_VERSION: string;
export const destroyed: boolean; //: false
export const Logger: {
    error: () => any;
    event: () => any;
};

export interface LoadOptions {
    appName?: string; //: null,
    appIconUrl?: string; //: null,
}

export namespace Compose {
    export function registerComposeViewHandler(handler: (composeView: ComposeView) => Function): Function;

    export function openNewComposeView(): Promise<ComposeView>;

    export interface ComposeView {
        addButton(buttonDescriptor: ComposeButtonDescriptor): void;

        //addButton(buttonDescriptor: Stream<ComposeButtonDescriptor>): void;

        addStatusBar(statusBarDescriptor: StatusBarDescriptor): StatusBarView;

        close(): void;

        send(): void;

        getBodyElement(): HTMLElement;

        getInitialMessageID(): string;

        getThreadID(): string;

        getDraftID(): Promise<string>;

        getCurrentDraftID(): Promise<string>;

        getHTMLContent(): string;

        getSelectedBodyHTML(): string;

        getSelectedBodyText(): string;

        getSubject(): string;

        getTextContent(): string;

        getToRecipients(): Contact[];

        getCcRecipients(): Contact[];

        getBccRecipients(): Contact[];

        insertTextIntoBodyAtCursor(text: string): void;

        insertHTMLIntoBodyAtCursor(html: string): HTMLElement;

        insertHTMLIntoBodyAtCursor(html: HTMLElement): HTMLElement;

        insertLinkChipIntoBodyAtCursor(text: string, url: string, iconUrl: string): HTMLElement;

        isInlineReplyForm(): boolean;

        isFullscreen(): boolean;

        setFullscreen(minimized: boolean): void;

        isMinimized(): boolean;

        setMinimized(minimized: boolean): void;

        popOut(): Promise<ComposeView>;

        isReply(): boolean;

        setToRecipients(emails: string[]): void;

        setCcRecipients(emails: string[]): void;

        setBccRecipients(emails: string[]): void;

        getFromContact(): Contact;

        getFromContactChoices(): Contact[];

        setFromEmail(email: string[]): void;

        setSubject(text: string): void;

        setBodyHTML(html: string): void;

        setBodyText(text: string): void;

        attachFiles(files: Blob[]): void;

        attachInlineFiles(Files): void;

        // TODO: Events

        // Properties
        destroyed: boolean;
    }

    export interface ComposeButtonDescriptor {
        title: string;
        iconUrl?: string;  //: null
        iconClass?: string; //: null
        onClick: (event: ComposeButtonClickEvent) => void;
        hasDropdown?: boolean; //: false
        type?: string; //: 'MODIFIER' // Permitted values SEND_ACTION, MODIFIER
        orderHint?: number; //: 0
        enabled?: boolean; //: true
    }

    export interface ComposeButtonClickEvent {
        composeView: ComposeView;
        dropdown: DropdownView;
    }

    export interface StatusBarDescriptor {
        height?: number; //:40
        orderHint?: number; //:0
    }

    export interface StatusBarView {
        el: HTMLElement;
        destroyed: boolean;

        destroy(): void;

        // TODO: Events
    }

}

export namespace Lists {
    export function registerThreadRowViewHandler(handler: (threadRowView: ThreadRowView) => any): void; // TODO: check any?

    export interface ThreadRowView {
        addLabel(labelDescriptor: LabelDescriptor): void;

        //addLabel(labelDescriptor: Stream<LabelDescriptor>): void;

        addImage(imageDescriptor: ImageDescriptor): void;

        //addImage(imageDescriptor: Stream<ImageDescriptor>): void;

        addButton(buttonDescriptor: ThreadRowButtonDescriptor): void;

        //addButton(buttonDescriptor: Stream<ThreadRowButtonDescriptor>): void;

        addActionButton(buttonDescriptor: ThreadRowActionButtonDescriptor): void;

        //addActionButton(buttonDescriptor: Stream<ThreadRowActionButtonDescriptor>): void;

        addAttachmentIcon(threadRowAttachmentIconDescriptor: ThreadRowAttachmentIconDescriptor): void

        //addAttachmentIcon(threadRowAttachmentIconDescriptor: stream<ThreadRowAttachmentIconDescriptor>): void

        replaceDate(threadRowDateDescriptor: ThreadRowDateDescriptor): void;

        //replaceDate(threadRowDateDescriptor: Stream<ThreadRowDateDescriptor>): void;

        replaceDraftLabel(draftLabelDescriptor: ThreadRowDraftLabelDescriptor): void;

        //replaceDraftLabel(draftLabelDescriptor: Stream<ThreadRowDraftLabelDescriptor>): void;

        getSubject(): string;

        getDateString(): string;

        getThreadID(): string;

        getThreadIDIfStable(): string;

        getDraftID(): Promise<string>;

        getVisibleDraftCount(): number;

        getVisibleMessageCount(): number;

        getContacts(): Contact[];

        // TODO: Events

        destroyed: boolean;
    }

    export interface ThreadRowButtonDescriptor {
        iconUrl: string;
        iconClass?: string; //: ''
        onClick: (event: ThreadRowButtonClickEvent) => void;
        hasDropdown?: boolean; //: false
    }

    export interface ThreadRowButtonClickEvent {
        threadRowView: ThreadRowView;
        dropdown: DropdownView;
    }

    export interface ThreadRowActionButtonDescriptor {
        type: ActionButtonTypes;
        title: string;
        className?: string; //: ''
        onClick?: (event: ThreadRowActionButtonClickEvent) => void;
        url: string;
    }

    export interface ThreadRowActionButtonClickEvent {
        // FIXME: testme, undocummented
    }

    export interface LabelDescriptor {
        title: string;
        foregroundColor?: string; //: ''
        backgroundColor?: string; //: ''
        iconUrl: string;
        iconClass?: string; //: ''
    }

    export interface ImageDescriptor {
        imageUrl: string;
        imageClass?: string; //: null
        tooltip?: string; //: null
        orderHint?: number; //: 0
    }

    export interface ThreadRowDateDescriptor {
        text: string;
        textColor?: string; //: ''
        tooltip?: string; //: ''
    }

    export interface ThreadRowAttachmentIconDescriptor {
        iconUrl?: string; //: ''
        iconClass?: string; //: ''
        tooltip?: string; //: ''
    }

    export interface ThreadRowDraftLabelDescriptor {
        text: string;
        count?: string; //: 1
    }

    export enum ActionButtonTypes {
        LINK
    }
}

export namespace Conversations {
    export function registerThreadViewHandler(handler: (threadView: ThreadView) => void): void;

    export function registerMessageViewHandler(handler: (messageView: MessageView) => void): void;

    export function registerMessageViewHandlerAll(handler: (messageView: MessageView) => void): void;

    export function registerFileAttachmentCardViewHandler(handler: (attachmentCardView: AttachmentCardView) => void): void;

    export interface ThreadView {
        addSidebarContentPanel(contentPanelDescriptor: ContentPanelDescriptor): ContentPanelView;

        getMessageViews(): MessageView[];

        getMessageViewsAll(): MessageView[];

        getSubject(): string;

        getThreadID(): string;

        // TODO: Events

        destroyed: boolean;
    }

    export interface MessageView {
        addAttachmentCardView(cardOptions: AttachmentCardOptions): AttachmentCardView;

        addAttachmentCardView(cardOptions: AttachmentCardNoPreviewOptions): AttachmentCardView;

        addaAttachmentsToolbarButton(buttonOtions: AttachmentsToolbarButtonDescriptor): void;

        addToolbarButton(options: MessageViewToolbarButtonDescriptor): void;

        getBodyElement(): HTMLElement;

        getMessageID(): string;

        getFileAttachmentCardViews(): AttachmentCardView[];

        isElementInQuotedArea(): boolean;

        isLoaded(): boolean;

        getLinksInbody(): MessageViewLinkDescriptor[];

        getSender(): Contact;

        getRecipients(): Contact[];

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

export namespace Toolbars {
    import ThreadRowView = InboxSDK.Lists.ThreadRowView;
    import ThreadView = InboxSDK.Conversations.ThreadView;

    export function registerToolbarButtonForList(toolbarButtonDescriptor: ToolbarButtonDescriptor): void;

    export function registerToolbarButtonForThreadView(toolbarButtonDescriptor: ToolbarButtonDescriptor): void;

    export function addToolbarButtonForApp(appToolbarButtonDescriptor: AppToolbarButtonDescriptor): AppToolbarButtonView;

    export interface ToolbarButtonDescriptor {
        title: string;
        iconUrl?: string; //: null
        iconClass?: string; //: null
        section: SectionNames;
        onClick: (event: ToolbarButtonEvent) => void;
        hasDropdown?: boolean //: false
        hideFor?: (routeView: Router.RouteView) => void; //: null
        keyboardShortcutHandle?: Keyboard.KeyboardShortcutHandle; //: null
    }

    export interface ToolbarButtonEvent {
        selectedThreadRowViews: ThreadRowView[];
        threadRowViews: ThreadRowView[];
        threadView: ThreadView;
        dropdown: DropdownView;
    }

    export interface AppToolbarButtonDescriptor {
        title: string;
        titleClass?: string; //: null
        iconUrl: string;
        iconClass?: string; //: null
        onClick: (event: AppToolbarButtonEvent) => void;
        arrowColor?: string; //: null
    }

    export interface AppToolbarButtonView {
        open(): void;

        close(): void;

        remove(): void;

        //TODO: Events

        destroyed: boolean;
    }

    export interface AppToolbarButtonEvent {
        dropdown: DropdownView;
    }

    export enum SectionNames {
        INBOX_STATE,
        METADATA_STATE,
        OTHER
    }
}

export namespace Router {
    export function createLink(routeID: string, params: Object): string;

    export function goto(routeID: string, params: Object): void;

    export function handleCustomRoute(routeID: string, handler: (customRouteView: CustomRouteView) => Function): Function;

    export function handleAllRoutes(handler: (routeView: RouteView) => Function): Function;

    export function handleListRoute(routeID: NativeListRouteIDs, handler: (listRouteView: ListRouteView) => Function): Function;

    export function handleCustomListRoute(routeID: string, handler: () => string[]): Function; // Array of ThreadIDs
    export function handleCustomListRoute(routeID: string, handler: () => Promise<string[]>): Function; // Promise for an array of ThreadIDs

    export function getCurrentRouteView(): RouteView;


    export interface RouteView {
        getRouteID(): string;

        getRouteType(): string;

        getParams(): string;

        // TODO: Events

        destroyed: boolean;
    }

    export interface CustomRouteView extends RouteView {
        getElement(): HTMLElement;
    }

    export interface ListRouteView extends RouteView {
        addCollapsibleSection(options: SectionDescriptor): CollapsibleSectionView;

        //addCollapsibleSection(options: Stream<SectionDescriptor>): CollapsibleSectionView;

        addSection(options: SectionDescriptor): SectionView;

        //addSection(options: Stream<SectionDescriptor>): SectionView;

        refresh(): void;
    }

    export interface SectionView {
        remove(): void;

        // TODO: Events

        destroyed: boolean;
    }

    export interface CollapsibleSectionView extends SectionView {
        setCollapsed(value: boolean): void;

        remove(): void

        // TODO: Events
    }

    export interface SectionDescriptor {
        title: string;
        subtitle?: string; //: null
        titleLinkText?: string; //: null
        onTitleLinkClick?: () => any; //: null // TODO: check any?
        hasDropdown?: boolean; //: false
        onDropdownClick?: (event: SectionDropdownClickEvent) => any; //: null // TODO: check any?
        tableRows?: RowDescriptor[]; //: null
        contentElement?: HTMLElement; //:null
        footerLinkText?: string; //: null
        onFooterLinkClick?: (event: SectionFooterLinkClickEvent) => any //: null // TODO: check any?
    }

    export interface SectionDropdownClickEvent {
        dropdown: DropdownView;
    }

    export interface SectionFooterLinkClickEvent {
        // FIXME: testme, undocumented
    }

    export interface RowDescriptor {
        title: string;
        body: string;
        shortDetailText: string;
        isRead: string;
        labels: Lists.LabelDescriptor[];
        iconUrl?: string; //: null
        iconClass?: string; //: null
        routeID?: string; //: null
        routeParams?: string; //: null
        onClick?: () => any; //: null
    }

    export enum NativeRouteIDs {
        INBOX,
        ALL_MAIL,
        SENT,
        STARRED,
        DRAFTS,
        SNOOZED,
        DONE,
        REMINDERS,
        LABEL,
        TRASH,
        SPAM,
        IMPORTANT,
        SEARCH,
        THREAD,
        CHATS,
        CHAT,
        CONTACTS,
        CONTACT,
        SETTINGS,
        ANY_LIST
    }

    export enum NativeListRouteIDs {
        INBOX,
        ALL_MAIL,
        SENT,
        STARRED,
        DRAFTS,
        SNOOZED,
        DONE,
        REMINDERS,
        LABEL,
        TRASH,
        SPAM,
        IMPORTANT,
        SEARCH,
        ANY_LIST
    }

    export enum RouteTypes {
        LIST,
        THREAD,
        SETTINGS,
        CHAT,
        CUSTOM,
        UNKNOWN
    }
}

export namespace NavMenu {
    export function addNavItem(navItemDescriptor: NavItemDescriptor): NavItemView;


    export interface NavItemView {
        addNavItem(navItemDescriptor: NavItemDescriptor): NavItemView;

        remove(): void;

        isCollapsed(): boolean;

        setCollapsed(collapseValue: boolean): void;

        // TODO: Events

        destroyed: boolean;
    }

    export interface NavItemDescriptor {
        name: string;
        routeId?: string; //: null
        routeParams?: Object; //: null
        orderHint?: number; //: Number.MAX_SAFE_INTEGER  // FIXME: integer
        accessory?: CreateAccessoryDescriptor | IconButtonAccessoryDescriptor | DropdownButtonAccessoryDescriptor; //: null
        iconUrl?: string; //: null
        iconClass?: string; //: null
    }

    export interface CreateAccessoryDescriptor {
        type: string; //: 'CREATE'
        onClick: () => any; // TODO: check any?
    }

    export interface IconButtonAccessoryDescriptor {
        type: string; //: 'ICON_BUTTON'
        onClick: () => any; // TODO: check any?
        iconUrl: string;
        iconClass?: string; //: null
    }

    export interface DropdownButtonAccessoryDescriptor {
        type: string; //: 'DROPDOWN_BUTTON'
        buttonBackgroundColor: string;
        buttonForegroundColor: string;
        onClick: (event: DropdownButtonClickEvent) => any; // TODO: check any?
    }

    export interface DropdownButtonClickEvent {
        dropdown: DropdownView;
    }

    // Undocumented
    export enum NavItemTypes {
        MANAGE,
        NAVIGATION
    }

    // Undocumented
    const SENT_MAIL: Object;
}

export namespace Widgets {


    export function showModalView(options: ModalOptions): ModalView;

    export function showMoleView(options: MoleOptions): MoleView;

    export function showDrawerView(options: DrawerOptions): DrawerView;

    export interface ModalOptions {
        el: HTMLElement;
        chrome?: boolean; //: true
        showCloseButton?: boolean; //: false
        title?: string; //: ''
        buttons?: ModalButtonDescriptor[]; // []
    }

    export interface ModalButtonDescriptor {
        text: string;
        title: string;
        onClick: () => any; // TODO: check any?
        type?: string; //: 'SECONDARY_ACTION'
        orderHint?: number; //: 0
    }

    export interface MoleOptions {
        el: HTMLElement;
        title?: string; //: ''
        titleEl?: HTMLElement; //: null
        minimizedTitleEl?: HTMLElement; //: null
        className?: string; //: ''
        titleButtons?: MoleButtonDescriptor[]; //: []
        chrome?: boolean; //: false
    }

    export interface MoleButtonDescriptor {
        title: string;
        iconUrl: string;
        iconClass?: string; //: ''
        onClick: () => any; // TODO: check any?
    }

    export interface DrawerOptions {
        el: HTMLElement;
        chrome?: boolean; //: true
        title?: string; //: ''
        composeView?: Compose.ComposeView; //: null
        closeWithCompose?: boolean; //: false
    }

    export interface ModalView {
        close(): void;

        // TODO: Events

        destroyed: boolean;
    }

    export interface MoleView {
        close(): void;

        setTitle(text: string): void;

        setMinimized(minimized: boolean): void;

        getMinimized(): boolean;

        // TODO: Events

        destroyed: boolean;
    }

    export interface DrawerView {
        close(): void;

        associateComposeView(composeView: Compose.ComposeView, closeWithCompose: boolean): void;

        // TODO: Events

        destroyed: boolean;
    }
}

export namespace ButterBar {
    export function showMessage(options: MessageDescriptor): Object;

    export function showLoading(): Object;

    export function showError(options: MessageDescriptor): Object;

    export function showSaving(options: SavingMessageDescriptor): Object;

    export function hideMessage(messageKey: Object): void;

    export function hideGmailMessage(): void;


    export interface MessageDescriptor {
        text: string;
        html?: string; //: ''
        el?: HTMLElement; //: null
        className?: string; //: ''
        priority?: number; //: 0
        time?: number; //: 15000
        hideOnViewChanged?: boolean; //: true
        persistent?: boolean; //: false
        messageKey?: Object; //: null
    }

    export interface SavingMessageDescriptor {
        text?: string; //: 'Saving...'
        confirmationText?: string; //: 'Saved'
        priority?: number; //: 0
        time?: number; //: Infinity
        confirmationTime?: number; //: 1000
        showConfirmation?: boolean; //: true
        hideOnViewChanged?: boolean; //: true
        persistent?: boolean; //: true
        messageKey?: Object; //: null
    }
}

export namespace Search {
    export function registerSearchSuggestionsProvider(handler: (query: string) => AutocompleteSearchResult[]): void;
    export function registerSearchSuggestionsProvider(handler: (query: string) => Promise<AutocompleteSearchResult[]>): void;

    export function registerSearchQueryRewriter(rewriter: SearchQueryRewriter): void;

    export interface AutocompleteSearchResult {
        name?: string; //: ''
        nameHTML?: string; //: ''
        description?: string; //: ''
        descriptionHTML?: string; //: ''
        iconUrl?: string; //: ''
        routeName?: string; //: ''
        routeParams?: string[] //: ''
        externalURL?: string; //: ''
    }

    export interface SearchQueryRewriter {
        term: string;
        termReplacer: () => any; // TODO: check any? // FIXME: export function can take a string or a Promise
    }
}

export namespace User {
    export function getEmailAddress(): string;

    export function getAccountSwitcherContactList(): Contact[];
}

export namespace Keyboard {
    export function createShortcutHandle(keyboardShortcutDescriptor: KeyboardShortcutDescriptor): KeyboardShortcutHandle;


    export interface KeyboardShortcutHandle {
        remove(): void;
    }

    export interface KeyboardShortcutDescriptor {
        chord: string;
        description: string;
    }
}

// Common Data Types

export interface Contact {
    name: string;
    emailAddress: string;
}

export interface DropdownView {
    setPlacementOptions(options: PositionOptions): void;

    close(): void;

    el: HTMLElement;
    destroyed: boolean;

    // TODO: Events
}

export interface PositionOptions {
    position?: string; //: null
    forcePosition?: boolean; //: false
    hAlign?: string; //: null
    forceHAlign?: boolean; //: false
    vAlign?: string; //: null
    forceVAlign?: boolean; //: false
    buffer?: number; //: 0
    topBuffer?: number; //:0
    bottomBuffer?: number; //: 0
    leftBuffer?: number; //:0
    rightBuffer?: number; //:0
}


export as namespace InboxSDK;
