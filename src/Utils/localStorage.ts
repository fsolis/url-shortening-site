import { get } from "svelte/store";
import { UrlStore } from "../Stores";
import type { ShortUrlList } from "../Types";

const localStorageKey = 'short_urls';

type ShortUrlsLocalStorage = {
    readonly urls: ShortUrlList
}

export function syncLocalStorage() {
    const storage = localStorage.getItem(localStorageKey);

    const parsedStorage: ShortUrlsLocalStorage = storage ? JSON.parse(storage) : { urls: [] };

    const urls = get(UrlStore);

    const updatedStorage = {
        ...parsedStorage,
        urls,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(updatedStorage));
}

export function loadLocalStorage() {
    const storage = localStorage.getItem(localStorageKey);

    const { urls }: ShortUrlsLocalStorage = storage ? JSON.parse(storage) : { urls: [] };

    UrlStore.set(urls);
}