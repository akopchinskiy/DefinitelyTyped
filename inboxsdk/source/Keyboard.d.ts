declare namespace InboxSDK.Keyboard {
    export function createShortcutHandle(keyboardShortcutDescriptor: KeyboardShortcutDescriptor): KeyboardShortcutHandle;

    export interface KeyboardShortcutHandle {
        remove(): void;
    }

    export interface KeyboardShortcutDescriptor {
        chord: string;
        description: string;
    }
}
