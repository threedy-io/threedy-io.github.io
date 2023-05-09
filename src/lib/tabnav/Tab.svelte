<script lang="ts">
  import { getContext } from 'svelte';
  import { TABS } from './Tabs.svelte';

  import type { TabContext } from './tabTypes';

  const tab = Symbol();
  const { registerTab, selectTab, selectedTab } = getContext<TabContext>(TABS);

  registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot />
</button>

<style>
  button {
    background: none;
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    margin: 0;
    color: white;
    font-size: var(--font-scale-4);
    font-weight: 500;
    margin-bottom: var(--font-scale-2);
    outline: none;
  }

  .selected {
    border-bottom: 2px solid var(--threedy-green);
    color: var(--threedy-green);
  }
</style>
