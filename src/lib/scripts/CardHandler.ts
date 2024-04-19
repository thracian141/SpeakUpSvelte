import { getToken } from "./UserHandler";
import { _, locale} from "svelte-i18n";

export let partsOfSpeech = [
    "Noun",
    "Verb",
    "Adjective",
    "Adverb",
    "Pronoun",
    "Preposition",
    "Conjunction",
    "Interjection",
    "Phrase"
]

export async function getPOS(pos: string) {
    //check if locale is en
    let lang = await localStorage.getItem('websiteLanguage');
    if (lang?.includes('en')) {
        return pos;
    }else {
        switch (pos) {
            case "Noun":
                return "Съществително";
            case "Verb":
                return "Глагол";
            case "Adjective":
                return "Прилагателно";
            case "Adverb":
                return "Наречие";
            case "Pronoun":
                return "Местоимение";
            case "Preposition":
                return "Предлог";
            case "Conjunction":
                return "Съюз";
            case "Interjection":
                return "Междуметие";
            case "Phrase":
                return "Фраза";
            default:
                break;
        }
    }
}

export interface DeckCardInput {
    front: string;
    back: string;
    difficulty:number;
    deckId: number;
}

export interface CourseCardInput {
    front: string;
    back: string;
    difficulty: number;
    partOfSpeech: string;
    sectionId: number;
    courseCode: string;
}
    export interface EditCourseCardModel {
        id: number;
        front: string;
        back: string;
        difficulty: number;
        partOfSpeech: string;
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

export interface DeckCard {
    id: number;
    front: string;
    back: string;
    level: number;
    difficulty: number;
    flaggedAsImportant: boolean;
    dateAdded: Date;
    lastReviewDate: Date;
    nextReviewDate: Date;
    deckId: number;
    userId: number;
}

export interface CourseCard {
    id: number;
    front: string;
    back: string;
    difficulty: number;
    partOfSpeech: string;
    dateAdded: Date;
    sectionId: number;
    courseCode: string;
}

export interface CardLink {
    id: number;
    cardId: number;
    card: CourseCard;
    userId: number;
    level: number;
    lastReviewDate: Date;
    nextReviewDate: Date;
    flaggedAsImportant: boolean;
    courseCode: string;
}

export async function addCardToDeck(cardInput:DeckCardInput) {
    let token = await getToken();   
    const response = await fetch("https://localhost:5000/card/addToDeck", {
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
    const card:DeckCard = data.card;
    return card;
}

export async function addCardToSection(cardInput: CourseCardInput) {
    let token = await getToken();   
    const response = await fetch("https://localhost:5000/card/addToCourseSection", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardInput)
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error adding card');
    }
    const data = await response.json();
    const card:CourseCard = data.card;
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
    const cardsList: DeckCard[] = data.list;
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
    const cardsList: CourseCard[] = data.list;
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

export async function editCardFromCourse(edit:EditCourseCardModel) { 
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/card/editFromCourse`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(edit)
    });

    if (!response.ok) 
        throw new Error('Error editing card');

    const data = await response.json();
    const card:CourseCard = data.oldCard; // the old car is now updated

    return card;
}

export async function getCourseCardById(id: number) {
    let token = await getToken();
    let response = await fetch(`https://localhost:5000/card/getCourseCardById?id=${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error getting course card");
    }

    let data = await response.json();
    const card = data.card;
    
    return card;
}