<script lang="ts">
  import { onMount, text } from "svelte/internal";
  import { get, writable } from "svelte/store";
  import { addUrlToStore, UrlStore } from "../../Stores";
  import type { ShortUrlList } from "../../Types";
  import { getShortUrl } from "../../Utils";

  const hasError = writable<boolean>(false);
  const hasEmptyError = writable<boolean>(false);
  const urlValidationRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;

  let inputRef: HTMLInputElement = null;

  const isValidUrl = (newUrl: string): boolean => {
    const urls = get(UrlStore);

    // Passes Regex i.e. it's a properly formatted url
    if (!urlValidationRegex.test(newUrl)) return false;

    // Make sure there isn't a duplicate
    for (const url in urls) {
      if (urls[url].url === newUrl) return false;
    }

    return true;
  };

  const handleUrlSubmit = async () => {
    hasError.set(false);
    hasEmptyError.set(false);

    if (!(inputRef && inputRef.value)) {
      hasError.set(true);
      hasEmptyError.set(true);
      return;
    }
    const { value } = inputRef;

    if (!isValidUrl(value)) {
      hasError.set(true);
      return;
    }

    try {
      const shortUrl = await getShortUrl(value);

      addUrlToStore(value, shortUrl);

      // Clear html element
      inputRef.value = "";
    } catch (e) {
      hasError.set(true);
    }
  };
</script>

<style type="text/scss">
  @import "./UrlInput.scss";
</style>

<div class="url-input">
  <div
    class="url-input__field"
    class:url-input__field--error={$hasError === true}>
    <input
      bind:this={inputRef}
      class="url-input__input"
      class:url-input__input--error={$hasError === true}
      name="url"
      title="URL Input"
      type="text"
      placeholder="Shorten a link here..." />
    {#if $hasEmptyError === true}
      <p class="url-input__error"><i>Please add a link</i></p>
    {/if}
  </div>

  <button
    class="url-input__submit-btn primary-btn"
    on:click={handleUrlSubmit}>Shorten It!</button>
</div>
