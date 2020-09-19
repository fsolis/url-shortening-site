<script lang="ts">
  import { onMount } from "svelte";
  import {
    Boost,
    Features,
    Footer,
    Hero,
    NavBar,
    UrlComponent,
    UrlList,
  } from "./components";
  import { loadLocalStorage, syncLocalStorage } from "./Utils";

  onMount(() => {
    loadLocalStorage();

    return () => {
      syncLocalStorage();
    };
  });
</script>

<style type="text/scss">
  @import "./App.scss";
</style>

<main class="shorty-app">
  <NavBar />
  <Hero />
  <section class="shorty-app__content">
    <UrlComponent />
    <UrlList />
    <Features />
  </section>
  <Boost />
  <Footer />
</main>
