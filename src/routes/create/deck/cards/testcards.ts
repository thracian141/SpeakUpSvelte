export interface Card { 
    id: number;
    front: string;
    back: string;
    level: number;
    difficulty: number;
}

let card1: Card = {
    id:1,
    front: "front",
    back: "back",
    level: 1.5,
    difficulty: 0    
}
let card2: Card = {
    id:2,
    front: "Test card",
    back: 'Test back',
    level:3,
    difficulty:3
}
let card3: Card = { id:3, front: "Card 3 front", back: "Card 3 back", level: 2, difficulty: 5 }

let card4: Card = { id:4, front: "Card 4 front", back: "Card 4 back", level: 4.5, difficulty: 7 }

let card5: Card = { id:5, front: "Card 5 front", back: "Card 5 back", level: 3, difficulty: 10 }


export let cards: Card[] = [card1, card2, card3, card4, card5];

import { writable } from 'svelte/store';
export let testcards = writable(cards);