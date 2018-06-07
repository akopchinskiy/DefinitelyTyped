declare namespace InboxSDK.Widgets {

    import ComposeView = InboxSDK.Compose.ComposeView;

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
        composeView?: ComposeView; //: null
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

        associateComposeView(composeView: ComposeView, closeWithCompose: boolean): void;

        // TODO: Events

        destroyed: boolean;
    }
}
