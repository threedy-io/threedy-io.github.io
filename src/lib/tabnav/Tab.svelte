<script>
  import { getContext } from 'svelte';
  import { TABS } from './Tabs.svelte';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

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
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: var(--font-scale-2);
  }

  .selected {
    border-bottom: 2px solid var(--threedy-green);
    color: var(--threedy-green);
  }
</style>
