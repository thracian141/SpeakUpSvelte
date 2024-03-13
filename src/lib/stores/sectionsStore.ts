import type { Section } from "$lib/scripts/SectionHandler";
import { writable } from "svelte/store";

let sectionsListStore = writable<Section[]>([]);
export { sectionsListStore };