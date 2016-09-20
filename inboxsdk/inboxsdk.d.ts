// Type definitions for InboxSDK
// Project: https://www.inboxsdk.com/
// Definitions by: Raphaël Doursenaud <rdoursenaud@gpcsolutions.fr>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/*
 * Copyright (c) 2016 GPC.solutions
 */

/// <reference path="../es6-promise/es6-promise.d.ts" />

declare namespace InboxSDK {
    function load(version: string, appId?: string, opts?: LoadOptions): Promise<InboxSDK>;

    function loadScript(url: string): Promise<void>;

    // Undocummented
    var IMPL_VERSION: string;
    var LOADER_VERSION: string;
    var destroyed: boolean; //: false
    var Logger: {
        error: () => any;
        event: () => any;
    };

    interface LoadOptions {
        appName?: string; //: null,
        appIconUrl?: string; //: null,
    }

    namespace Compose {
        function registerComposeViewHandler(handler: (composeView: ComposeView) => Function): Function;

        function openNewComposeView(): Promise<ComposeView>;

        interface ComposeView {
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

        interface ComposeButtonDescriptor {
            title: string;
            iconUrl?: string;  //: null
            iconClass?: string; //: null
            onClick: (event: ComposeButtonClickEvent) => void;
            hasDropdown?: boolean; //: false
            type?: string; //: 'MODIFIER' // Permitted values SEND_ACTION, MODIFIER
            orderHint?: number; //: 0
            enabled?: boolean; //: true
        }

        interface ComposeButtonClickEvent {
            composeView: ComposeView;
            dropdown: DropdownView;
        }

        interface StatusBarDescriptor {
            height?: number; //:40
            orderHint?: number; //:0
        }

        interface StatusBarView {
            el: HTMLElement;
            destroyed: boolean;

            destroy(): void;

            // TODO: Events
        }

    }

    namespace Lists {
        function registerThreadRowViewHandler(handler: (threadRowView: ThreadRowView) => any): void; // TODO: check any?

        interface ThreadRowView {
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

        interface ThreadRowButtonDescriptor {
            iconUrl: string;
            iconClass?: string; //: ''
            onClick: (event: ThreadRowButtonClickEvent) => void;
            hasDropdown?: boolean; //: false
        }

        interface ThreadRowButtonClickEvent {
            threadRowView: ThreadRowView;
            dropdown: DropdownView;
        }

        interface ThreadRowActionButtonDescriptor {
            type: ActionButtonTypes;
            title: string;
            className?: string; //: ''
            onClick?: (event: ThreadRowActionButtonClickEvent) => void;
            url: string;
        }

        interface ThreadRowActionButtonClickEvent {
            // FIXME: testme, undocummented
        }

        interface LabelDescriptor {
            title: string;
            foregroundColor?: string; //: ''
            backgroundColor?: string; //: ''
            iconUrl: string;
            iconClass?: string; //: ''
        }

        interface ImageDescriptor {
            imageUrl: string;
            imageClass?: string; //: null
            tooltip?: string; //: null
            orderHint?: number; //: 0
        }

        interface ThreadRowDateDescriptor {
            text: string;
            textColor?: string; //: ''
            tooltip?: string; //: ''
        }

        interface ThreadRowAttachmentIconDescriptor {
            iconUrl?: string; //: ''
            iconClass?: string; //: ''
            tooltip?: string; //: ''
        }

        interface ThreadRowDraftLabelDescriptor {
            text: string;
            count?: string; //: 1
        }

        enum ActionButtonTypes {
            LINK
        }
    }

    namespace Conversations {
        function registerThreadViewHandler(handler: (threadView: ThreadView) => void): void;

        function registerMessageViewHandler(handler: (messageView: MessageView) => void): void;

        function registerMessageViewHandlerAll(handler: (messageView: MessageView) => void): void;

        function registerFileAttachmentCardViewHandler(handler: (attachmentCardView: AttachmentCardView) => void): void;

        interface ThreadView {
            addSidebarContentPanel(contentPanelDescriptor: ContentPanelDescriptor): ContentPanelView;

            getMessageViews(): MessageView[];

            getMessageViewsAll(): MessageView[];

            getSubject(): string;

            getThreadID(): string;

            // TODO: Events

            destroyed: boolean;
        }

        interface MessageView {
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

        interface ContentPanelView {
            remove(): void;

            // TODO: Events

            destroyed: boolean;
        }

        interface AttachmentCardView {
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

        interface AttachmentCardOptions {
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

        interface AttachmentCardNoPreviewOptions {
            title: string;
            description: string;
            previewUrl: string;
            iconThumbnailUrl: string;
            previewOnClick: (event: PreviewClickEvent) => void;
            fileIconImageUrl: string;
            buttons: DownloadButtonDescriptor[] | CustomButtonDescriptor[];
            foldColor?: string; //: #BEBEBE
        }

        interface PreviewClickEvent {
            attachmentCardView: AttachmentCardView;
            preventDefault(): void;
        }

        interface ContentPanelDescriptor {
            el: HTMLElement;
            title: string;
            iconUrl: string;
            orderHint?: number; //: 0
        }

        interface DownloadButtonDescriptor {
            downloadUrl: string;
            onClick: (event: DownloadButtonClickEvent) => void;
            openInNewTab?: boolean; //: false
        }

        interface DownloadButtonClickEvent {
            // FIXME: testme, undocumented
        }

        interface CustomButtonDescriptor {
            iconUrl: string;
            tooltip: string;
            onClick: (event: AttachmentCardClickEvent) => void;
        }

        interface AttachmentCardClickEvent {
            // FIXME: testme, AttachmentCardClickEvent not documented
        }

        interface AttachmentsToolbarButtonDescriptor {
            tooltip: string;
            iconUrl: string;
            onClick: (event: AttachmentsToolbarButtonEvent) => void;
        }

        interface AttachmentsToolbarButtonEvent {
            attachmentCardViews: AttachmentCardView[];
        }

        interface MessageViewLinkDescriptor {
            text: string;
            html: string;
            element: HTMLElement;
            href: string;
            isInQuotedArea: boolean;
        }

        interface MessageAttachmentIconDescriptor {
            iconUrl: string;
            iconClass?: string; //: 'MODIFIER'
            tooltip: string;
            onClick: () => any; // TODO: check any?
        }

        interface MessageViewToolbarButtonDescriptor {
            section: MessageViewToolbarSectionNames;
            title: string;
            iconUrl: string;
            iconClass?: string; //: ''
            onClick: () => any; // TODO: check any?
            orderHint: () => any; // TODO: check any?
        }

        enum MessageViewViewStates {
            HIDDEN,
            COLLAPSED,
            EXPANDED
        }

        enum MessageViewToolbarSectionNames {
            MORE
        }
    }

    namespace Toolbars {
        import ThreadRowView = InboxSDK.Lists.ThreadRowView;
        import ThreadView = InboxSDK.Conversations.ThreadView;
        function registerToolbarButtonForList(toolbarButtonDescriptor: ToolbarButtonDescriptor): void;

        function registerToolbarButtonForThreadView(toolbarButtonDescriptor: ToolbarButtonDescriptor): void;

        function addToolbarButtonForApp(appToolbarButtonDescriptor: AppToolbarButtonDescriptor): AppToolbarButtonView;

        interface ToolbarButtonDescriptor {
            title: string;
            iconUrl?: string; //: null
            iconClass?: string; //: null
            section: SectionNames;
            onClick: (event: ToolbarButtonEvent) => void;
            hasDropdown?: boolean //: false
            hideFor?: (routeView: Router.RouteView) => void; //: null
            keyboardShortcutHandle?: Keyboard.KeyboardShortcutHandle; //: null
        }

        interface ToolbarButtonEvent {
            selectedThreadRowViews: ThreadRowView[];
            threadRowViews: ThreadRowView[];
            threadView: ThreadView;
            dropdown: DropdownView;
        }

        interface AppToolbarButtonDescriptor {
            title: string;
            titleClass?: string; //: null
            iconUrl: string;
            iconClass?: string; //: null
            onClick: (event: AppToolbarButtonEvent) => void;
            arrowColor?: string; //: null
        }

        interface AppToolbarButtonView {
            open(): void;
            close(): void;
            remove(): void;

            //TODO: Events

            destroyed: boolean;
        }

        interface AppToolbarButtonEvent {
            dropdown: DropdownView;
        }

        enum SectionNames {
            INBOX_STATE,
            METADATA_STATE,
            OTHER
        }
    }

    namespace Router {
        function createLink(routeID: string, params: Object): string;

        function goto(routeID: string, params: Object): void;

        function handleCustomRoute(routeID: string, handler: (customRouteView: CustomRouteView) => Function): Function;

        function handleAllRoutes(handler: (routeView: RouteView) => Function): Function;

        function handleListRoute(routeID: NativeListRouteIDs, handler: (listRouteView: ListRouteView) => Function): Function;

        function handleCustomListRoute(routeID: string, handler: () => string[]): Function; // Array of ThreadIDs
        function handleCustomListRoute(routeID: string, handler: () => Promise<string[]>): Function; // Promise for an array of ThreadIDs

        function getCurrentRouteView(): RouteView;


        interface RouteView {
            getRouteID(): string;

            getRouteType(): string;

            getParams(): string;

            // TODO: Events

            destroyed: boolean;
        }

        interface CustomRouteView extends RouteView {
            getElement(): HTMLElement;
        }

        interface ListRouteView extends RouteView {
            addCollapsibleSection(options: SectionDescriptor): CollapsibleSectionView;
            //addCollapsibleSection(options: Stream<SectionDescriptor>): CollapsibleSectionView;

            addSection(options: SectionDescriptor): SectionView;
            //addSection(options: Stream<SectionDescriptor>): SectionView;

            refresh(): void;
        }

        interface SectionView {
            remove(): void;

            // TODO: Events

            destroyed: boolean;
        }

        interface CollapsibleSectionView extends SectionView {
            setCollapsed(value: boolean): void;

            remove(): void

            // TODO: Events
        }

        interface SectionDescriptor {
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

        interface SectionDropdownClickEvent {
            dropdown: DropdownView;
        }

        interface SectionFooterLinkClickEvent {
            // FIXME: testme, undocumented
        }

        interface RowDescriptor {
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

        enum NativeRouteIDs {
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

        enum NativeListRouteIDs {
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

        enum RouteTypes {
            LIST,
            THREAD,
            SETTINGS,
            CHAT,
            CUSTOM,
            UNKNOWN
        }
    }

    namespace NavMenu {
        function addNavItem(navItemDescriptor: NavItemDescriptor): NavItemView;


        interface NavItemView {
            addNavItem(navItemDescriptor: NavItemDescriptor): NavItemView;

            remove(): void;

            isCollapsed(): boolean;

            setCollapsed(collapseValue: boolean): void;

            // TODO: Events

            destroyed: boolean;
        }

        interface NavItemDescriptor {
            name: string;
            routeId?: string; //: null
            routeParams?: Object; //: null
            orderHint?: number; //: Number.MAX_SAFE_INTEGER  // FIXME: integer
            accessory?: CreateAccessoryDescriptor | IconButtonAccessoryDescriptor | DropdownButtonAccessoryDescriptor; //: null
            iconUrl?: string; //: null
            iconClass?: string; //: null
        }

        interface CreateAccessoryDescriptor {
            type: string; //: 'CREATE'
            onClick: () => any; // TODO: check any?
        }

        interface IconButtonAccessoryDescriptor {
            type: string; //: 'ICON_BUTTON'
            onClick: () => any; // TODO: check any?
            iconUrl: string;
            iconClass?: string; //: null
        }

        interface DropdownButtonAccessoryDescriptor {
            type: string; //: 'DROPDOWN_BUTTON'
            buttonBackgroundColor: string;
            buttonForegroundColor: string;
            onClick: (event: DropdownButtonClickEvent) => any; // TODO: check any?
        }

        interface DropdownButtonClickEvent {
            dropdown: DropdownView;
        }

        // Undocumented
        enum NavItemTypes {
            MANAGE,
            NAVIGATION
        }

        // Undocumented
        var SENT_MAIL: Object;
    }

    namespace Widgets {
        import ComposeView = Compose.ComposeView;
        function showModalView(options: ModalOptions): ModalView;

        function showMoleView(options: MoleOptions): MoleView;

        function showDrawerView(options: DrawerOptions): DrawerView;

        interface ModalOptions {
            el: HTMLElement;
            chrome?: boolean; //: true
            showCloseButton?: boolean; //: false
            title?: string; //: ''
            buttons?: ModalButtonDescriptor[]; // []
        }

        interface ModalButtonDescriptor {
            text: string;
            title: string;
            onClick: () => any; // TODO: check any?
            type?: string; //: 'SECONDARY_ACTION'
            orderHint?: number; //: 0
        }

        interface MoleOptions {
            el: HTMLElement;
            title?: string; //: ''
            titleEl?: HTMLElement; //: null
            minimizedTitleEl?: HTMLElement; //: null
            className?: string; //: ''
            titleButtons?: MoleButtonDescriptor[]; //: []
            chrome?: boolean; //: false
        }

        interface MoleButtonDescriptor {
            title: string;
            iconUrl: string;
            iconClass?: string; //: ''
            onClick: () => any; // TODO: check any?
        }

        interface DrawerOptions {
            el: HTMLElement;
            chrome?: boolean; //: true
            title?: string; //: ''
            composeView?: Compose.ComposeView; //: null
            closeWithCompose?: boolean; //: false
        }

        interface ModalView {
            close(): void;

            // TODO: Events

            destroyed: boolean;
        }

        interface MoleView {
            close(): void;

            setTitle(text: string): void;

            setMinimized(minimized: boolean): void;

            getMinimized(): boolean;

            // TODO: Events

            destroyed: boolean;
        }

        interface DrawerView {
            close(): void;

            associateComposeView(composeView: Compose.ComposeView, closeWithCompose: boolean): void;

            // TODO: Events

            destroyed: boolean;
        }
    }

    namespace ButterBar {
        function showMessage(options: MessageDescriptor): Object;

        function showLoading(): Object;

        function showError(options: MessageDescriptor): Object;

        function showSaving(options: SavingMessageDescriptor): Object;

        function hideMessage(messageKey: Object): void;

        function hideGmailMessage(): void;


        interface MessageDescriptor {
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

        interface SavingMessageDescriptor {
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

    namespace Search {
        function registerSearchSuggestionsProvider(handler: (query: string) => AutocompleteSearchResult[]): void;
        function registerSearchSuggestionsProvider(handler: (query: string) => Promise<AutocompleteSearchResult[]>): void;

        function registerSearchQueryRewriter(rewriter: SearchQueryRewriter): void;

        interface AutocompleteSearchResult {
            name?: string; //: ''
            nameHTML?: string; //: ''
            description?: string; //: ''
            descriptionHTML?: string; //: ''
            iconUrl?: string; //: ''
            routeName?: string; //: ''
            routeParams?: string[] //: ''
            externalURL?: string; //: ''
        }

        interface SearchQueryRewriter {
            term: string;
            termReplacer: () => any; // TODO: check any? // FIXME: function can take a string or a Promise
        }
    }

    namespace User {
        function getEmailAddress(): string;

        function getAccountSwitcherContactList(): Contact[];
    }

    namespace Keyboard {
        function createShortcutHandle(keyboardShortcutDescriptor: KeyboardShortcutDescriptor): KeyboardShortcutHandle;


        interface KeyboardShortcutHandle {
            remove(): void;
        }

        interface KeyboardShortcutDescriptor {
            chord: string;
            description: string;
        }
    }

    // Common Data Types

    interface Contact {
        name: string;
        emailAddress: string;
    }

    interface DropdownView {
        setPlacementOptions(options: PositionOptions): void;

        close(): void;

        el: HTMLElement;
        destroyed: boolean;

        // TODO: Events
    }

    interface PositionOptions {
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
}
