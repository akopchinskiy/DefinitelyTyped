declare module 'InboxSDK/Toolbars' {
    import {ThreadRowView} from "InboxSDK/Lists";
    import {ThreadView} from "InboxSDK/Conversations";
    import {RouteView} from "InboxSDK/Router";
    import {KeyboardShortcutHandle} from "InboxSDK/Keyboard";
    import {DropdownView} from "InboxSDK";

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
        hideFor?: (routeView: RouteView) => void; //: null
        keyboardShortcutHandle?: KeyboardShortcutHandle; //: null
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
