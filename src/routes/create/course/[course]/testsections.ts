import { writable } from "svelte/store";

export interface Section {
    id: number;
    title: string;
    description: string;
    level: number;
    order: number;
}

let section1: Section = {
    id: 0,
    title: "Basic Phrases",
    description: "Learn to introduce yourself and others, and to greet people in different situations.",
    level: 9,
    order: 1
}
let section2: Section = {
    id: 1,
    title: "The Alphabet",
    description: "Learn the alphabet and the sounds of the letters.",
    level: 10,
    order: 2
}
let section3: Section = {
    id: 2,
    title: "Numbers",
    description: "Learn to count from 1 to 100.",
    level: 4,
    order: 3
}
let section4: Section = {
    id: 3,
    title: "Basic Vocabulary",
    description: "Learn basic vocabulary words.",
    level: 2,
    order: 4
}
let section5: Section = {
    id: 4,
    title: "Intermediate Phrases",
    description: "Learn to have a basic conversation with someone.",
    level: 5,
    order: 5
}
let section6: Section = {
    id: 5,
    title: "Intermediate Vocabulary",
    description: "Learn more vocabulary words.",
    level: 6,
    order: 6,
}
let section7: Section = {
    id: 6,
    title: "The Present Tense",
    description: "Learn to talk about what you are doing right now.",
    level: 2,
    order: 7
}
let section8: Section = {
    id: 7,
    title: "The Past Tense",
    description: "Learn to talk about what you did yesterday.",
    level: 3,
    order: 8
}

export let sections: Section[] = [section1, section2, section3, section4, section5, section6, section7, section8];

export const testsections = writable(sections);