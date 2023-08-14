<div class="tab-list">
  <slot />
</div>

<style>
  @media screen and (max-width: 487px) {
    .tab-list {
      display: flex;
      flex-direction: column;
      scale: 0.85;
    }
  }
</style>
