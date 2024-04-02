import type { CourseCard, DeckCard } from "$lib/scripts/CardHandler";
import { writable } from "svelte/store";

let courseCardsStore = writable<CourseCard[]>([]);
export { courseCardsStore };
let deckCardsStore = writable<DeckCard[]>([]);
export { deckCardsStore };