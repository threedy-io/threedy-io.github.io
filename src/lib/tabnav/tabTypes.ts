export interface TabContext {
    registerTab: (tab: symbol) => void;
    registerPanel: (panel: object) => void;
    selectTab: (tab: symbol) => void;
    selectedTab: import('svelte/store').Writable<symbol | null>;
    selectedPanel: import('svelte/store').Writable<object | null>;
  }