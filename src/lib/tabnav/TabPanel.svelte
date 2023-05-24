<script lang="ts">
  import { getContext } from 'svelte';
  import { TABS } from './Tabs.svelte';
  import type { TabContext } from './tabTypes';

  const panel = {};
  const { registerPanel, selectedPanel } = getContext<TabContext>(TABS);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <slot />
{/if}
