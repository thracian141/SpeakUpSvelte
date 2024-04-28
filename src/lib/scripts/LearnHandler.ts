import { getToken } from "./UserHandler";
import type { DeckCard, CourseCard, CardLink } from "./CardHandler";
import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import { url } from "$lib/url";

export interface Sentence {
    id: number;
    front: string;
    back: string;
    wordId: number;
}
export interface LevelCardInputModel {
    correct: boolean;
    linkId: number;
    level: number;
    difficulty: number;
}

export let courseLearnStore = writable<CardLink[]>([]);
export let sentenceStore = writable<Sentence[]>([]);

export let deckLearnStore = writable<DeckCard[]>([]);

export async function updateCourseLearnStore() {
    let token = await getToken();
    let response = await fetch(`${url}/learn/updateCourse`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error updating learn store");
    }

    let data = await response.json();

    const cardlinks: CardLink[] = data.cardLinks;
    console.log(cardlinks);
    const cards: CourseCard[] = data.cards;
    for (let i = 0; i < cardlinks.length; i++) {
        cardlinks[i].card = cards[i]
    }
    await courseLearnStore.set(cardlinks);

    const sentences: Sentence[] = data.sentences;
    console.log(sentences)
    await sentenceStore.set(sentences);
}

export async function updateDeckLearnStore() {
    let token = await getToken();
    let response = await fetch(`${url}/learn/updateDeck`, {
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

export async function nextCourseCard(skipId: number) {
    let token = await getToken();
    let response = await fetch(`${url}/learn/nextcoursecard?skipId=${skipId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.status === 204) {
        goto('/learn/course/nocontent');
        return;
    }
    if (!response.ok) {
        console.log(response.text());
        throw new Error("Error getting next course card");
    }

    let data = await response.json();
    let cardLink: CardLink = data.cardLink;
    const card: CourseCard = data.card;
    cardLink.card = card;
    const sentence = data.sentence;

    return {cardLink, sentence};
}

export async function sendAnswer(levelModel: LevelCardInputModel) {
    let token = await getToken();
    let response = await fetch(`${url}/learn/levelcoursecard`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(levelModel)
    });

    if (!response.ok) {
        throw new Error("Error sending answer");
    } else {
        return response;
    }
}

export async function checkIfAnyCards() {
    let token = await getToken();
    let response = await fetch(`${url}/learn/anyCards`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error checking if any cards");
    }

    let data = await response.json();
    const anyCards = data.anyCards;
    return anyCards;
}

export async function nextDeckCard(skipId: number) {
    let token = await getToken();
    let response = await fetch(`${url}/learn/nextdeckcard?skipId=${skipId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    console.log(response);
    if (response.status === 204) {
        goto('/learn/deck/nocontent');
        return;
    }
    if (!response.ok) {
        throw new Error("Error getting next deck card");
    }

    let data = await response.json();
    console.log(data);
    let card: DeckCard = data.randomCard;
    console.log(card);
    return card;
}

export async function sendDeckAnswer(levelModel: LevelCardInputModel) {
    let token = await getToken();
    let response = await fetch(`${url}/learn/leveldeckcard`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(levelModel)
    });

    if (!response.ok) {
        throw new Error("Error sending answer");
    } else {
        return response;
    }
}