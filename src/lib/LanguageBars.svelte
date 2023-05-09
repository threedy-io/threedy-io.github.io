<script lang="ts">
  import type { LanguageBar } from './types';

  export let languageData: { [key: string]: number } = {
    Svelte: 7596,
    JavaScript: 900,
    HTML: 357,
    CSS: 210,
  };
  let languageBars: LanguageBar[];

  const totalAmount = Object.values(languageData).reduce(
    (total, amount) => total + amount,
    0
  );

  const languageKeys = Object.keys(languageData);

  languageData = Object.fromEntries(
    Object.entries(languageData).sort((a, b) => b[1] - a[1])
  );

  languageBars = languageKeys.map((language, index) => {
    const amount = languageData[language];
    const percentage = (amount / totalAmount) * 100;
    const previousPercentage =
      index > 0 ? languageBars[index - 1].percentage : 0;
    return {
      language,
      amount,
      percentage,
      previousPercentage,
    };
  });
</script>

<div class="bar-chart">
  <ul>
    {#if languageBars}
      {#each languageBars as { language, amount, percentage, previousPercentage }}
        <li class="language">{language}</li>
        <li
          class="bar"
          style="width: {percentage}%; left: {previousPercentage}%;"
        >
          <span class="amount">{amount}</span>
        </li>
      {/each}
    {/if}
  </ul>
</div>

<style>
  .bar-chart {
    position: relative;
    height: auto;
    width: 100%;
    background-color: #eee;
    padding: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .language {
    margin-bottom: 5px;
    font-weight: bold;
  }

  .bar {
    position: relative;
    display: block;
    height: 30px;
    font-size: 0.8em;
    color: white;
    margin-bottom: 10px;
  }

  .bar:nth-child(1) {
    background-color: #f44336;
  }

  .bar:nth-child(2) {
    background-color: #2196f3;
  }

  .bar:nth-child(3) {
    background-color: #4caf50;
  }

  .bar:nth-child(4) {
    background-color: #ff9800;
  }

  .amount {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    color: white;
  }
</style>
