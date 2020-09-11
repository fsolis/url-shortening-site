
import { writable, get } from 'svelte/store';
import type { ShortUrlList } from '../Types';
import { syncLocalStorage } from '../Utils';

export const UrlStore = writable<ShortUrlList>([]);

export function addUrlToStore(url: string, shortUrl: string) {
    const urls = get(UrlStore);
    const updatedUrls: ShortUrlList = [{ url, shortUrl }, ...urls];

    UrlStore.set(updatedUrls);

    syncLocalStorage();
}