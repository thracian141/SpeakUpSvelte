import {getToken} from './UserHandler';

export interface DeckInput {
    deckName: string;
    deckDescription: string;
}
export interface Deck {
    id: number;
    deckName: string;
    level: number;
    difficulty: number;
    deckDescription: string;
    ownerId: number;
}

export async function createDeck(deckInput: DeckInput) {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/deck/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deckInput)
    });

    if (!response.ok) {
        throw new Error('Error creating deck');
    } else if  (response.ok) {
        return response.text();
    }
}

export async function getDeckById(id: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/deck/getById?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error getting deck');
    }

    const data = await response.json();
    const deck: Deck = data.deck;

    return deck;
}

export async function getDecksList() {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/deck/list`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    console.log(data.list);
    const decksList: Deck[] = data.list;

    return decksList;
}

export async function searchDecks(search: string) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/deck/search?search=${search}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error searching decks');
    }

    const data = await response.json();
    console.log(data.list);
    const decksList: Deck[] = data.list;

    return decksList;
}