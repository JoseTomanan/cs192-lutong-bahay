// filepath: /src/lib/stores/recipes.ts
import { writable } from 'svelte/store';

export const recipesStore = writable([]);
export const recipesLoaded = writable(false); // Tracks if recipes are already loaded