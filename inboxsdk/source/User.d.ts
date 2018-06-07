declare module 'types-inboxsdk/InboxSDK/User' {
    import {Contact} from "types-inboxsdk/InboxSDK";

    export function getEmailAddress(): string;

    export function getAccountSwitcherContactList(): Contact[];

}
