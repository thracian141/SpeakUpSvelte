import { writable } from 'svelte/store';
import type { DeckInputModel } from '$lib/scripts/models/inputModels';

export const deckStore = writable<DeckInputModel | null>(null);