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
  @import "../styles/main";

  .url-nav {
    display: flex;
    flex-direction: row;
    max-width: 85%;
    margin: 0 auto;
    flex: 1;
    justify-content: space-between;
    position: relative;

    &__left {
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      max-width: 650px;
    }

    &__right {
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
    }

    &__title {
      margin-right: 1rem;
    }

    &__link {
      color: $gray-violet;
      cursor: pointer;
      display: none;
      margin: 0 1rem;

      @include laptop {
        display: block;
      }

      &:hover {
        color: $very-dark-violet;
      }
    }

    &__btn {
      display: none;
      background-color: white;
      border: none;
      color: $gray-violet;
      font-weight: 500;
      margin: 0 1rem;
      cursor: pointer;

      @include laptop {
        display: block;
      }

      &:first-of-type {
        margin-right: 0;
      }

      &:hover {
        color: $very-dark-violet;
      }

      &--primary {
        background-color: $cyan;
        border-radius: 18px;
        color: $white;
        padding: 8px 14px;

        &:hover {
          background-color: transparentize($cyan, 0.7);
          color: $white;
        }
      }
    }

    &__toggle {
      height: 30px;
      width: 30px;
      cursor: pointer;
      @include laptop {
        display: none;
      }
    }
  }

  .mobile-nav {
    position: absolute;
    background-color: $dark-violet;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 2rem);
    text-align: center;
    top: 100%;
    padding: 1rem;

    &__link {
      color: $white;
      font-weight: $bold;
      padding: 1rem;

      &--primary {
        background-color: $cyan;
        border-radius: 25px;

        @include tablet {
          margin: 0 auto;
          width: 250px;
        }
      }
    }

    &__divider {
      width: 90%;
      border: none;
      border-bottom: 1px solid $gray-violet;
    }
  }
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
