import { getToken } from "./UserHandler";
import type { DeckCard, CourseCard, CardLink } from "./CardHandler";
import { writable } from "svelte/store";

export interface Sentence {
    id: number;
    front: string;
    back: string;
    wordId: number;
}

export let courseLearnStore = writable<CardLink[]>([]);
export let sentenceStore = writable<Sentence[]>([]);

export let deckLearnStore = writable<DeckCard[]>([]);

export async function updateCourseLearnStore() {
    let token = await getToken();
    let response = await fetch("https://localhost:5000/learn/updateCourse", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error updating learn store");
    }

    let data = await response.json();

    const cards: CardLink[] = data.cardLinks;
    await courseLearnStore.set(cards);

    const sentences: Sentence[] = data.sentences;
    await sentenceStore.set(sentences);
}

export async function updateDeckLearnStore() {
    let token = await getToken();
    let response = await fetch("https://localhost:5000/learn/updateDeck", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error updating learn store");
    }

    let data = await response.json();

    const cards: DeckCard[] = data.cards;
    await deckLearnStore.set(cards);
}