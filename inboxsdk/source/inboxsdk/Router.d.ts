import {LabelDescriptor} from "./Lists";
import {DropdownView} from "./index";

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
    labels: LabelDescriptor[];
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
