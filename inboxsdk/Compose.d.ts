declare module 'InboxSDK/Compose' {
    import {Contact, DropdownView} from 'InboxSDK';

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
