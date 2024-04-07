import { writable } from "svelte/store";
import { getToken } from "./UserHandler";

export interface Sentence {
    id: number;
    front: string;
    back: string;
    wordId: number;
}

export let sentencesStore = writable<Sentence[]>([]);

export async function listSentences(cardId: number) {
    let token = getToken();
    const response = await fetch(`https://localhost:5000/sentence/listByCard?cardId=${cardId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Error listing sections by course');
    }
    if (response.status === 204) 
        return [];
    

    const data = await response.json();
    const sentences: Sentence[] = data.sentences;
    
    return sentences;
}

export async function addSentenceToCard(front:string, back:string, wordId: number) {
    let token = getToken();
    const input = { front, back, wordId } 

    const response = await fetch("https://localhost:5000/sentence/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(input)
    });

    const data = await response.json();
    const sentence: Sentence = data.sentence;

    return sentence;
}

export async function deleteSentence(sentenceId: number) {
    let token = getToken();
    const response = await fetch(`https://localhost:5000/sentence/delete?id=${sentenceId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error deleting sentence');
    }

    return;
}

export async function deleteAllSentences(cardId: number) {
    let token = getToken();
    const response = await fetch(`https://localhost:5000/sentence/deleteAll?cardId=${cardId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error deleting all sentences');
    }

    return;
}
