<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllRepos, loadImageWithoutToken } from './lib/LoadGithubData';

  import GridItem from './lib/GridItem.svelte';
  import Header from './lib/Header.svelte';
  import { Tabs, TabList, TabPanel, Tab } from './lib/tabnav/tabs';

  // Stores repo data and loading status
  let isLoading = true;
  let allRepoData;
  let devRepos;
  let integratorRepos;
  let topRepos;

  const showGridPanel = false;

  const FIRST_TOPIC = import.meta.env.VITE_TOPIC_1;
  const SECOND_TOPIC = import.meta.env.VITE_TOPIC_2;

  async function loadAllData() {
    allRepoData = await loadAllRepos();
    allRepoData = allRepoData.sort(
      (repoA, repoB) => repoA.updated_at - repoB.updated_at
    );
    topRepos = allRepoData.slice(0, 6);

    devRepos = allRepoData.filter((repo) => repo.topics.includes(FIRST_TOPIC));

    integratorRepos = allRepoData.filter((repo) =>
      repo.topics.includes(SECOND_TOPIC)
    );

    //add images
    for (const repo of allRepoData) {
      const thumbnailData = await loadImageWithoutToken(repo.name);
      repo.thumbnail = thumbnailData;
      console.log(repo);
    }
    isLoading = false;
  }

  onMount(loadAllData);
</script>

<main>
  <Header />
  {#if isLoading}
    <p class="loading-message">Loading repositories...</p>
  {:else}
    {#if showGridPanel}
      <h2 class="grid-title">Use Cases</h2>
      <div class="grid">
        {#each topRepos as item}
          <GridItem
            url={item.html_url}
            title={item.name}
            description={item.description}
            imageBlob={item.thumbnail}
          />
        {/each}
      </div>
      <button class="grid-showall-btn">VIEW ALL PROJECTS</button>
    {/if}

    <Tabs>
      <TabList>
        <Tab>for developers</Tab>
        <Tab>for integrators</Tab>
      </TabList>

      <TabPanel>
        <div class="grid">
          {#each devRepos as item}
            <GridItem
              url={item.html_url}
              title={item.name}
              description={item.description}
              imageBlob={item.thumbnail}
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
              imageBlob={item.thumbnail}
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

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
  }

  .loading-message {
    padding: 1rem;
    padding-top: 2.5rem;
    font-size: 1.8rem;
    display: flex;
    grid-column-start: 2;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 0;
    position: relative;
    margin-bottom: 2rem;
  }

  @media only screen and (max-width: 1383px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 946px) {
    .grid {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }

  .grid-title {
    align-self: baseline;
  }
  .grid-showall-btn {
    position: relative;
    bottom: 1rem;
    font-size: var(--font-scale-4);
    margin-bottom: 3rem;
  }
</style>
