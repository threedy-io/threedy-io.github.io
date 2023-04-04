<script lang="ts">
  import FallbackImage from "../assets/fallback.png";
  export let title: string;
  export let description: string;
  export let url: string;
</script>

<div class="repo-card">
  <div class="card-text">
    <h3>{title}</h3>
    <p class="description truncate">{description}</p>
  </div>
  <a href={url}>view code</a>
</div>

<style>
  /* card item styles */

  .repo-card {
    margin: 1rem;
    box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px;
    border-radius: 0.3rem;
    background-color: var(--threedy-dark-blue);
    min-width: 400px;
    overflow: hidden;
    width: 100%;
    height: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
  }

  .repo-card:hover {
    cursor: pointer;
    transition: all 125ms;
    /* color: var(--threedy-green); */
  }

  .card-text {
    padding: var(--font-scale-6);
  }
  .repo-card > a {
    position: absolute;
    right: var(--font-scale-6);
    bottom: var(--font-scale-6);
  }

  .description {
    font-size: var(--font-scale-5);
  }
  .truncate {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
