<script lang="ts">
  import { text } from "svelte/internal";
  import { writable } from "svelte/store";

  const hasError = writable<boolean>(false);

  const handleUrlSubmit = (event: MouseEventHandler<HTMLButtonElement>) => {
    console.log(event);
  };
</script>

<style type="text/scss">
  @import "./UrlInput.scss";
</style>

<div class="url-input">
  <div class="url-input__field">
    <input
      class="url-input__input"
      class:url-input__input--error={$hasError === true}
      type="text"
      placeholder="Shorten a link here..." />
    {#if $hasError === true}
      <p>Please add a link</p>
    {/if}
  </div>

  <button
    class="url-input__submit-btn primary-btn"
    on:click={handleUrlSubmit}>Shorten It!</button>
</div>
