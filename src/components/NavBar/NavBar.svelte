<script type="ts">
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  const isMobileMenuVisible = writable<boolean>(false);

  const handleMobileMenueToggle = (event) =>
    isMobileMenuVisible.update((isOpen) => !isOpen);

  const hideMobileMenuOnResize = () => {
    isMobileMenuVisible.set(false);
  };

  // If the site resizes to a bigger screen we want to hide the mobile menu
  // so that we do not get in a situation where we have the mobile menu open
  // in a larger screen without a way to close it
  const resizeListener = window.matchMedia("screen and (max-width: 992px)");

  onMount(() => {
    resizeListener.addListener(hideMobileMenuOnResize);

    return () => resizeListener.removeListener(hideMobileMenuOnResize);
  });
</script>

<style type="text/scss">
  @import "./NavBar.scss";
</style>

<nav class="url-nav">
  <section class="url-nav__left">
    <h1 class="url-nav__title">Shortly</h1>
    <h4 class="url-nav__link">Features</h4>
    <h4 class="url-nav__link">Pricing</h4>
    <h4 class="url-nav__link">Resources</h4>
  </section>

  <section class="url-nav__right">
    <button class="url-nav__btn">Login</button>
    <button class="url-nav__btn url-nav__btn--primary">Sign Up</button>
    <img
      class="url-nav__toggle"
      src="./assets/bars-solid.svg"
      alt="Mobile Menu Toggle"
      on:click={handleMobileMenueToggle} />
  </section>

  {#if $isMobileMenuVisible === true}
    <section
      class="mobile-nav"
      transition:slide={{ delay: 180, duration: 250, easing: quintOut }}>
      <a class="mobile-nav__link" href="#">Features</a>
      <a class="mobile-nav__link" href="#">Pricing</a>
      <a class="mobile-nav__link" href="#">Resources</a>
      <hr class="mobile-nav__divider" />
      <a class="mobile-nav__link" href="#">Login</a>
      <a class="mobile-nav__link mobile-nav__link--primary" href="#">Sign Up</a>
    </section>
  {/if}
</nav>
