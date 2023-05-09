<script>
  import i3dhubLogo from '../assets/instant3Dhub-logo.svg';
</script>

<header>
  <img src={i3dhubLogo} alt="instant3Dhub logo" />
  <h1>Code Examples</h1>
  <span>
    instant3Dhub can be integrated into various toolchains and workflows. Below
    are some examples to help you get started.
  </span>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: var(--font-scale-5);
    margin-bottom: var(--font-scale-2);
  }

  @media screen and (max-width: 487px) {
    header {
      scale: 0.9;
    }
  }
  img {
    height: 5rem;
    margin-bottom: var(--font-scale-2);
  }

  span {
    font-size: var(--font-scale-5);
    max-width: 450px;
  }
</style>
