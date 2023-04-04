<script lang="ts">
  import { onMount } from 'svelte';
  import { loadData, loadAllRepos } from './lib/LoadGithubData';

  import GridItem from './lib/GridItem.svelte';
  import Header from './lib/Header.svelte';
  import { Tabs, TabList, TabPanel, Tab } from './lib/tabnav/tabs';
  import GridItemSmall from './lib/GridItemSmall.svelte';

  // Stores repo data and loading status
  let isLoading = true;
  let allRepoData;
  let devRepos;
  let integratorRepos;
  let topRepos;

  let showGridPanel = false;
  let showTabPanel = true;

  const FIRST_TOPIC = 'odin-project';
  const SECOND_TOPIC = 'portfolio';

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

    //  devRepos = await loadData(FIRST_TOPIC, 3);
    //  integratorRepos = await loadData(SECOND_TOPIC, 3);

    isLoading = false;
  }

  onMount(loadAllData);
</script>

<main>
  <div class="controls">
    <input
      type="checkbox"
      name="toggleTabs"
      id=""
      bind:checked={showTabPanel}
    />
    <input
      type="checkbox"
      name="toggleTabs"
      id=""
      bind:checked={showGridPanel}
    />
  </div>
  <Header />
  {#if isLoading}
    <p class="loading-message">Loading...</p>
  {:else}
    {#if showGridPanel}
      <h2 class="grid-title">Use Cases</h2>
      <div class="grid">
        {#each topRepos as item}
          <GridItem
            url={item.html_url}
            title={item.name}
            description={item.description}
          />
        {/each}
      </div>
      <button class="grid-showall-btn">VIEW ALL PROJECTS</button>
    {/if}

    {#if showTabPanel}
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
              />
            {/each}
          </div>
        </TabPanel>
      </Tabs>

      <!-- else if tab nav is not selected -->
    {:else}
      <div class="row">
        <div class="column">
          <h2>For Developers</h2>
          {#each devRepos as item}
            <GridItem
              title={item.name}
              description={item.description}
              url={item.html_url}
            />
          {/each}
          <button>see more</button>
        </div>
        <div class="column">
          <h2>For Integrators</h2>
          {#each integratorRepos as item}
            <GridItem
              title={item.name}
              description={item.description}
              url={item.html_url}
            />
          {/each}
          <button>see more</button>
        </div>
      </div>
    {/if}
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

  /* Style your columns */
  .column {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 0;
    justify-content: space-between;
    flex-direction: row;
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

  /* Clear floats after the columns */
  .row:after {
    content: '';
    display: table;
    clear: both;
  }
  input {
    color: white;
  }

  .controls {
    position: fixed;
    padding: 1rem;
    top: 0;
    right: 0;
    background-color: black;
  }
</style>
