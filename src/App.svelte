<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllRepos, loadImageWithoutToken } from './lib/LoadGithubData';

  import GridItem from './lib/GridItem.svelte';
  import Header from './lib/Header.svelte';
  import { Tabs, TabList, TabPanel, Tab } from './lib/tabnav/tabs';

  import type { Repository } from './lib/types';

  // Stores repo data and loading status
  let isLoading = true;
  let allRepos: Repository[];
  let devRepos: Repository[];
  let integratorRepos: Repository[];
  let usecaseRepos: Repository[];

  const FIRST_TOPIC = import.meta.env.VITE_TOPIC_1;
  const SECOND_TOPIC = import.meta.env.VITE_TOPIC_2;
  const THIRD_TOPIC = import.meta.env.VITE_TOPIC_3;

  async function loadAllData() {
    allRepos = await loadAllRepos();
    //the repo for the splash page isn't needed in this view
    allRepos = allRepos.filter((repo) => {
      return repo.name !== 'threedy-io.github.io';
    });
    allRepos = allRepos.sort(
      (repoA, repoB) => repoA.updated_at - repoB.updated_at
    );
    usecaseRepos = allRepos
      .filter((repo) => {
        return repo.topics.includes(THIRD_TOPIC);
      })
      .map((repo) => {
        repo.topics = repo.topics.slice(0, 6);
        return repo;
      });

    devRepos = allRepos.filter((repo) => repo.topics.includes(FIRST_TOPIC));

    integratorRepos = allRepos.filter((repo) =>
      repo.topics.includes(SECOND_TOPIC)
    );

    //add images
    for (const repo of allRepos) {
      const thumbnailData = await loadImageWithoutToken(repo.name);
      repo.thumbnail = thumbnailData;
    }
    isLoading = false;
  }

  onMount(loadAllData);
</script>

<main>
  <Header />

  {#if isLoading}
    <p class="max-w-6xl">Loading repositories...</p>
  {:else}
    <Tabs>
      <TabList>
        <Tab>ALL PROJECTS</Tab>
        <Tab>USE CASES</Tab>
        <Tab>DEVELOPERS</Tab>
        <Tab>INTEGRATORS</Tab>
      </TabList>

      <TabPanel>
        <div class="flex flex-row flex-wrap">
          {#each allRepos as item}
            <GridItem
              url={item.html_url}
              title={item.name}
              description={item.description}
              imageUrl={item.thumbnail}
            />
          {/each}
        </div>
      </TabPanel>

      <TabPanel>
        <div class="grid">
          {#each usecaseRepos as item}
            <GridItem
              url={item.html_url}
              title={item.name}
              description={item.description}
              imageUrl={item.thumbnail}
            />
          {/each}
        </div>
      </TabPanel>
      <TabPanel>
        <div class="grid">
          {#each devRepos as item}
            <GridItem
              url={item.html_url}
              title={item.name}
              description={item.description}
              imageUrl={item.thumbnail}
            />
          {/each}
        </div>
      </TabPanel>

      <TabPanel>
        <div class="grid">
          {#each integratorRepos as item}
            <GridItem
              url={item.html_url}
              title={item.name}
              description={item.description}
              imageUrl={item.thumbnail}
            />
          {/each}
        </div>
      </TabPanel>
    </Tabs>
  {/if}
</main>

<footer>
  <span>© 2023 Threedy. All rights reserved</span>
</footer>
