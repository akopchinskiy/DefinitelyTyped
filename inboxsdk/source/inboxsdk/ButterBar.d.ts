export function showMessage(options: MessageDescriptor): Object;

export function showLoading(): Object;

export function showError(options: MessageDescriptor): Object;

export function showSaving(options: SavingMessageDescriptor): Object;

export function hideMessage(messageKey: Object): void;

export function hideGmailMessage(): void;


export interface MessageDescriptor {
    text: string;
    html?: string; //: ''
    el?: HTMLElement; //: null
    className?: string; //: ''
    priority?: number; //: 0
    time?: number; //: 15000
    hideOnViewChanged?: boolean; //: true
    persistent?: boolean; //: false
    messageKey?: Object; //: null
}

export interface SavingMessageDescriptor {
    text?: string; //: 'Saving...'
    confirmationText?: string; //: 'Saved'
    priority?: number; //: 0
    time?: number; //: Infinity
    confirmationTime?: number; //: 1000
    showConfirmation?: boolean; //: true
    hideOnViewChanged?: boolean; //: true
    persistent?: boolean; //: true
    messageKey?: Object; //: null
}
