import { goto } from '$app/navigation';
import { getToken, type User } from './UserHandler';
import { url } from '$lib/url';

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
    const response = await fetch(`${url}/deck/create`, {
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
    const response = await fetch(`${url}/deck/getById?id=${id}`, {
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
    const response = await fetch(`${url}/deck/list`, {
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
    const response = await fetch(`${url}/deck/search?search=${search}`, {
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

export async function setActiveDeck(deckId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/deck/setactivedeck?deckId=${deckId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error setting active deck');
    }

    goto('/');
    return response.text();
}

export async function getLastDeck() {
    let token = await getToken();
    const response = await fetch(`${url}/deck/getlastdeck`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error getting last deck');
    }
    
    if (response.status === 204) {
        return null;
    } else {
        const data = await response.json();
        const deck: Deck = data.deck;
        return deck;
    }
}

export async function editDeck(deckId: number, deckName: string, deckDescription: string) {
    let values: string[] = [String(deckId), deckName, deckDescription];
    let token = await getToken();
    const response = await fetch(`${url}/deck/editDeck`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    });

    if (!response.ok) {
        throw new Error('Error editing deck');
    }

    const data = await response.json();
    const deck: Deck = data.deck;

    return deck;
}

export async function deleteDeck(deckId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/deck/deleteDeck?deckId=${deckId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error deleting deck');
    }

    return response.text();
}

export async function getDeckOwner(deckId: number) {
    let token = await getToken();
    const response = await fetch(`${url}/deck/getowner?deckId=${deckId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Error getting owner');
    }

    const data = await response.text();
    return data;
}
        
        