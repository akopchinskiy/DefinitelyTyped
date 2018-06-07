export function registerSearchSuggestionsProvider(handler: (query: string) => AutocompleteSearchResult[]): void;
export function registerSearchSuggestionsProvider(handler: (query: string) => Promise<AutocompleteSearchResult[]>): void;

export function registerSearchQueryRewriter(rewriter: SearchQueryRewriter): void;

export interface AutocompleteSearchResult {
    name?: string; //: ''
    nameHTML?: string; //: ''
    description?: string; //: ''
    descriptionHTML?: string; //: ''
    iconUrl?: string; //: ''
    routeName?: string; //: ''
    routeParams?: string[] //: ''
    externalURL?: string; //: ''
}

export interface SearchQueryRewriter {
    term: string;
    termReplacer: () => any; // TODO: check any? // FIXME: export function can take a string or a Promise
}
