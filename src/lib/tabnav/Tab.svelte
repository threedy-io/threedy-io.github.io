<script lang="ts">
  import { getContext } from 'svelte';
  import { TABS } from './Tabs.svelte';

  import type { TabContext } from './tabTypes';

  const tab = Symbol();
  const { registerTab, selectTab, selectedTab } = getContext<TabContext>(TABS);

  registerTab(tab);
</script>

<button class="tab tab-bordered" on:click={() => selectTab(tab)}>
  <slot />
</button>
