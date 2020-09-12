<script lang="ts">
  import { writable } from "svelte/store";

  import { UrlStore } from "../../Stores";
  let urls;
  const copiedUrl = writable<string | null>(null);

  UrlStore.subscribe(list => {
    urls = list;
  });

  const copyUrl = (shortUrl: string) => {
    const mockElement = document.createElement("input");
    mockElement.value = shortUrl;
    document.body.appendChild(mockElement);
    mockElement.select();
    document.execCommand("copy");
    document.body.removeChild(mockElement);

    copiedUrl.set(shortUrl);
  };
</script>

<style type="text/scss">
  @import "./UrlList.scss";
</style>

<section class="url-list">
  {#each urls as { url, shortUrl }, i}
    <div class="url-list-item">
      <p class="url-list-item__url">{url}</p>
      <div class="url-list-item__right">
        <a
          id={`url-item-${shortUrl}`}
          href={shortUrl}
          class="url-list-item__short-url"
          target="_blank">
          {shortUrl}
        </a>
        {#if shortUrl === $copiedUrl}
          <button
            class="url-list-item__btn primary-btn url-list-item__btn--selected"
            on:click={() => copyUrl(shortUrl)}>
            Copied
          </button>
        {:else}
          <button
            class="url-list-item__btn primary-btn"
            on:click={() => copyUrl(shortUrl)}>
            Copy
          </button>
        {/if}
      </div>
    </div>
  {/each}
</section>
