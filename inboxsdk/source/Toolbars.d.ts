import {DropdownView} from "types-inboxsdk/InboxSDK";
import {RouteView} from "./Router";
import {KeyboardShortcutHandle} from "./Keyboard";
import {ThreadRowView} from "./Lists";
import {ThreadView} from "./Conversations";

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
