import { getToken } from "./UserHandler";

export interface CardInput {
    front: string;
    back: string;
    difficulty:number;
    deckId: number;
    sectionId: number;
}

export interface Card {
    id: number;
    front: string;
    back: string;
    level: number;
    difficulty: number;
    dateAdded: Date;
    lastReviewDate: Date;
    nextReviewDate: Date;
    deckId: number | null;
    sectionId: number | null;
}

export async function addCard(cardInput:CardInput) {
    let token = await getToken();   
    const response = await fetch("https://localhost:5000/card/add", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInput)
    });

    if (!response.ok) 
        throw new Error('Error adding card');

    const data = await response.json();
    const card:Card = data.card;
    return card;
}

export async function listCardsByDeck(deckId:number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/card/listByDeck?deckId=${deckId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error getting cards');

    const data = await response.json();
    const cardsList: Card[] = data.list;
    return cardsList;
}
export async function listCardsBySection(sectionId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/card/listBySection?sectionId=${sectionId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) 
        throw new Error('Error getting cards');
    const data = await response.json();
    const cardsList: Card[] = data.list;
    return cardsList;
}

export async function deleteCard(cardId:number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/card/delete?id=${cardId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error deleting card');

    return;
}