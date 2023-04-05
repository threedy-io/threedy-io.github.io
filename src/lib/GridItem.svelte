<script lang="ts">
  import { onMount } from 'svelte';
  import FallbackImage from '../assets/fallback.png';
  import { loadRepoLanguage } from './LoadGithubData';
  // import LanguageBars from './LanguageBars.svelte';
  export let title: string;
  export let description: string;
  export let url: string;
  export let imageBlob;
  let imageUrl;

  let languagesLoaded = false;
  let thumbnailLoaded = false;

  async function handleLanguages() {
    if (languagesLoaded) return;

    const languageData = await loadRepoLanguage(title);
  }

  async function handleThumbnails() {
    if (thumbnailLoaded) return;

    imageUrl = URL.createObjectURL(imageBlob);
  }

  onMount(handleThumbnails);
</script>

<div class="repo-card">
  <img
    src={imageBlob}
    alt="repository example"
    on:error={() => (imageBlob = FallbackImage)}
  />
  <div class="card-text">
    <h3 class="card-title">{title}</h3>
    <p class="description truncate">{description ?? ''}</p>
    <!-- <LanguageBars languageData={languages} /> -->
  </div>
  <div class="card-link">
    <svg width="20" height="20">
      <path
        d="M5 10 L15 10 M10 5 L15 10 L10 15"
        stroke="white"
        stroke-width="2"
        fill="none"
      />
    </svg>
    <div class="link-spacer" />
    <a target="_blank" href={url}>View Project</a>
  </div>
</div>

<style>
  .card-link {
    position: absolute;
    bottom: var(--font-scale-6);
    right: var(--font-scale-6);
    font-size: var(--font-scale-5);
    text-align: right;
    display: flex;
    align-items: center;
  }
  img {
    background-color: gray;
    max-width: 100%;
    height: auto;
    display: block;
  }

  .repo-card {
    margin: 0.5rem;
    box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px;
    border-radius: 0.3rem;
    background-color: var(--threedy-dark-blue);
    width: fit-content;
    overflow: hidden;
    max-width: 300px;
    min-width: 380px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    text-align: left;
  }

  /* .repo-card:hover {
    box-shadow: rgba(255, 255, 255, 0.5) 0px 2px 8px 0px;
    cursor: pointer;
    transition: all 125ms;
    border: 1px solid var(--threedy-green);
  } */

  .card-text {
    position: relative;
    padding: var(--font-scale-5);
    margin-bottom: var(--font-scale-5);
  }
  .card-title {
    padding: 0;
    margin: 0;
  }

  .description {
    padding: 0;
    font-size: var(--font-scale-5);
  }
  .truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
