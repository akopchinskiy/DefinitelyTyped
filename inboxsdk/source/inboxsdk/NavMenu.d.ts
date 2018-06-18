import {DropdownView} from "./main";

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
export const SENT_MAIL: Object;
