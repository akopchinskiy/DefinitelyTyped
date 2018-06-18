// Type definitions for InboxSDK
// Project: https://www.inboxsdk.com/
// Definitions by: Raphaël Doursenaud <rdoursenaud@gpcsolutions.fr>
// And also by: Artem Kopchinskiy <a.kopchinskiy@apollo4u.net>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as InboxSDK from './main';

interface Window {
    InboxSDK: typeof InboxSDK;
}
