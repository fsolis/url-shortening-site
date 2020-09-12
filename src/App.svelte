<script lang="ts">
  import { onMount } from "svelte";
  import { Hero, NavBar, UrlComponent, UrlList } from "./components";
  import { loadLocalStorage, syncLocalStorage } from "./Utils";

  onMount(() => {
    loadLocalStorage();

    return () => {
      syncLocalStorage();
    };
  });
</script>

<style type="text/scss">
  @import "./styles/main";

  .shorty-app {
    max-width: 85%;
    margin: 0 auto;

    &__content {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        background-color: transparentize($gray, 0.75);
        top: 20%;
        bottom: -10%;
        left: -10%;
        right: -10%;
        z-index: -1;
      }
    }
  }
</style>

<main class="shorty-app">
  <NavBar />
  <Hero />
  <section class="shorty-app__content">
    <UrlComponent />
    <UrlList />
  </section>
</main>
