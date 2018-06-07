declare module 'InboxSDK/User' {
    import {Contact} from "InboxSDK";

    export function getEmailAddress(): string;

    export function getAccountSwitcherContactList(): Contact[];

}
