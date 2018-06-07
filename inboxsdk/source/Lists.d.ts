declare namespace InboxSDK.Lists {

    export function registerThreadRowViewHandler(handler: (threadRowView: ThreadRowView) => any): void; // TODO: check any?

    export interface ThreadRowView {
        addLabel(labelDescriptor: LabelDescriptor): void;

        //addLabel(labelDescriptor: Stream<LabelDescriptor>): void;

        addImage(imageDescriptor: ImageDescriptor): void;

        //addImage(imageDescriptor: Stream<ImageDescriptor>): void;

        addButton(buttonDescriptor: ThreadRowButtonDescriptor): void;

        //addButton(buttonDescriptor: Stream<ThreadRowButtonDescriptor>): void;

        addActionButton(buttonDescriptor: ThreadRowActionButtonDescriptor): void;

        //addActionButton(buttonDescriptor: Stream<ThreadRowActionButtonDescriptor>): void;

        addAttachmentIcon(threadRowAttachmentIconDescriptor: ThreadRowAttachmentIconDescriptor): void

        //addAttachmentIcon(threadRowAttachmentIconDescriptor: stream<ThreadRowAttachmentIconDescriptor>): void

        replaceDate(threadRowDateDescriptor: ThreadRowDateDescriptor): void;

        //replaceDate(threadRowDateDescriptor: Stream<ThreadRowDateDescriptor>): void;

        replaceDraftLabel(draftLabelDescriptor: ThreadRowDraftLabelDescriptor): void;

        //replaceDraftLabel(draftLabelDescriptor: Stream<ThreadRowDraftLabelDescriptor>): void;

        getSubject(): string;

        getDateString(): string;

        /**@deprecated*/
        getThreadID(): string;

        getThreadIDAsync(): Promise<string>;

        getThreadIDIfStable(): string;

        getDraftID(): Promise<string>;

        getVisibleDraftCount(): number;

        getVisibleMessageCount(): number;

        getContacts(): Contact[];

        // TODO: Events

        destroyed: boolean;
    }

    export interface ThreadRowButtonDescriptor {
        iconUrl: string;
        iconClass?: string; //: ''
        onClick: (event: ThreadRowButtonClickEvent) => void;
        hasDropdown?: boolean; //: false
    }

    export interface ThreadRowButtonClickEvent {
        threadRowView: ThreadRowView;
        dropdown: DropdownView;
    }

    export interface ThreadRowActionButtonDescriptor {
        type: ActionButtonTypes;
        title: string;
        className?: string; //: ''
        onClick?: (event: ThreadRowActionButtonClickEvent) => void;
        url: string;
    }

    export interface ThreadRowActionButtonClickEvent {
        // FIXME: testme, undocummented
    }

    export interface LabelDescriptor {
        title: string;
        foregroundColor?: string; //: ''
        backgroundColor?: string; //: ''
        iconUrl: string;
        iconClass?: string; //: ''
    }

    export interface ImageDescriptor {
        imageUrl: string;
        imageClass?: string; //: null
        tooltip?: string; //: null
        orderHint?: number; //: 0
    }

    export interface ThreadRowDateDescriptor {
        text: string;
        textColor?: string; //: ''
        tooltip?: string; //: ''
    }

    export interface ThreadRowAttachmentIconDescriptor {
        iconUrl?: string; //: ''
        iconClass?: string; //: ''
        tooltip?: string; //: ''
    }

    export interface ThreadRowDraftLabelDescriptor {
        text: string;
        count?: string; //: 1
    }

    export enum ActionButtonTypes {
        LINK
    }
}
