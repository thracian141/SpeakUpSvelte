import type { Card } from "$lib/scripts/CardHandler";
import { writable } from "svelte/store";

let cardsListStore = writable<Card[]>([]);
export { cardsListStore };