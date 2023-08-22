<script context="module">
  export const TABS = {};
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import type { TabContext } from './tabTypes';

  const tabs: symbol[] = [];
  const panels: object[] = [];
  const selectedTab = writable<symbol | null>(null);
  const selectedPanel = writable<object | null>(null);

  const contextValue: TabContext = {
    registerTab: (tab) => {
      tabs.push(tab);
      selectedTab.update((current) => current || tab);

      onDestroy(() => {
        const i = tabs.indexOf(tab);
        tabs.splice(i, 1);
        selectedTab.update((current) =>
          current === tab ? tabs[i] || tabs[tabs.length - 1] : current
        );
      });
    },

    registerPanel: (panel) => {
      panels.push(panel);
      selectedPanel.update((current) => current || panel);

      onDestroy(() => {
        const i = panels.indexOf(panel);
        panels.splice(i, 1);
        selectedPanel.update((current) =>
          current === panel ? panels[i] || panels[panels.length - 1] : current
        );
      });
    },

    selectTab: (tab) => {
      const i = tabs.indexOf(tab);
      selectedTab.set(tab);
      selectedPanel.set(panels[i]);
    },

    selectedTab,
    selectedPanel,
  };

  setContext(TABS, contextValue);
</script>

<div class="tabs">
  <div class="spacer" />
  <slot />
</div>

<style>
  .tabs {
    flex-grow: 1;
  }
</style>
