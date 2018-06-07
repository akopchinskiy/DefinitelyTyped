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
