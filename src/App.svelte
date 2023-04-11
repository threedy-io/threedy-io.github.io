<script lang="ts">
  import { onMount } from 'svelte';
  import { loadAllRepos, loadImageWithoutToken } from './lib/LoadGithubData';

  import GridItem from './lib/GridItem.svelte';
  import Header from './lib/Header.svelte';
  import { Tabs, TabList, TabPanel, Tab } from './lib/tabnav/tabs';

  type Repository = {
    html_url: string;
    name: string;
    description: string;
    thumbnail: string;
    topics: string[];
    updated_at: any;
  };

  // Stores repo data and loading status
  let isLoading = true;
  let allRepoData: Repository[];
  let devRepos: Repository[];
  let integratorRepos: Repository[];
  let topRepos: Repository[];

  let showGridPanel = false;

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
  <div class="controls">
    <input type="checkbox" name="dev" bind:checked={showGridPanel} />
  </div>
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
      <a
        href="https://github.com/threedy-io"
        target="_blank"
        class="grid-showall-btn">VIEW ALL PROJECTS</a
      >
    {/if}

    <Tabs>
      <TabList>
        <Tab>DEVELOPERS</Tab>
        <Tab>INTEGRATORS</Tab>
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
  .controls {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  main {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
    flex: 1;
  }

  .loading-message {
    padding: 1rem;
    padding-top: var(--font-scale-3);
    font-size: var(--font-scale-3);
    display: flex;
    grid-column-start: 2;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--font-scale-6);
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
    border-radius: 0;
    border: 1px solid transparent;
    color: var(--threedy-dark-blue);
    padding: 0.6em 1.2em;
    font-size: var(--font-scale-4);
    font-weight: 500;
    font-family: inherit;
    background-color: var(--threedy-green);
    cursor: pointer;
    transition: all 60ms ease-in-out;
    border: 2px solid transparent;
  }
  .grid-showall-btn:hover {
    border: 2px solid var(--threedy-green);
    background-color: transparent;
    color: var(--threedy-green);
  }

  footer {
    color: var(--threedy-green);
    z-index: 2;
    padding: var(--font-scale-3);
    text-align: center;
    flex-shrink: 0;
  }
</style>
