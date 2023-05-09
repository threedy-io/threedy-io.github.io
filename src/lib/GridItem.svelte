<script lang="ts">
  import FallbackImage from '../assets/fallback.png';
  export let title: string;
  export let description: string;
  export let url: string;
  export let imageUrl: string;
</script>

<div class="repo-card">
  <a target="_blank" href={url}>
    <img
      src={imageUrl}
      alt="repository example"
      on:error={() => (imageUrl = FallbackImage)}
    />
  </a>
  <div class="card-text">
    <h3 class="card-title">{title}</h3>
    <p class="description truncate">{description ?? ''}</p>
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
  img:hover {
    cursor: pointer;
  }

  .repo-card {
    margin: var(--font-scale-6);
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

  @media screen and (max-width: 487px) {
    .repo-card {
      min-width: 0;
    }
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
