<script lang="ts">
  import { onMount } from "svelte";
  import { Hero, NavBar, UrlComponent } from "./components";
  import { loadLocalStorage, syncLocalStorage } from "./Utils";

  onMount(() => {
    loadLocalStorage();

    return () => {
      syncLocalStorage();
    };
  });
</script>

<style type="text/scss">
  .shorty-app {
    max-width: 85%;
    margin: 0 auto;
  }
</style>

<main class="shorty-app">
  <NavBar />
  <Hero />
  <UrlComponent />
</main>
