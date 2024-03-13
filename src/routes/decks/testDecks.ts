import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { _ } from 'svelte-i18n';

export class Deck {
    public id: string;
    public getName = () => get(this.name);
    public name: Readable<string>;
    public description: string;
    public image: any;
    public fromLang: string[];

    constructor(id:string, nameKey: string, fromLang:string[], description: string, image: string) {
        this.id = id;
        this.name = derived(_, $ => $(nameKey));
        this.getName = () => get(this.name);
        this.description = description;
        this.image = image;
        this.fromLang = fromLang;
    }
}

let bulgarianDeck = new Deck('en-to-bg', 'languages.bulgarian', ['bg-to-en'], "Bulgarian, spoken by 10 million people, offers opportunities for travel and business. Learning it can ease understanding of other Slavic languages. This course covers basic Bulgarian grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png");
let englishDeck = new Deck('bg-to-en', 'languages.english', ['en-to-bg'], "English is the most widely spoken language in the world. Learning it can open doors to business, travel, and culture. This course covers basic English grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png");
let germanDeck = new Deck('en-to-de', 'languages.german', ['bg-to-en'], "German is the most widely spoken language in the European Union. Learning it can open doors to business, travel, and culture. This course covers basic German grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png");
let turkishDeck = new Deck('en-to-tr', 'languages.turkish', ['bg-to-en'], "Turkish is spoken by around 90 million people. Learning it can open doors to business, travel, and culture. This course covers basic Turkish grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png");
let italianDeck = new Deck('en-to-it', 'languages.italian', ['bg-to-en'], "Italian is spoken by around 85 million people. Learning it can open doors to business, travel, and culture. This course covers basic Italian grammar, vocabulary, pronunciation, and cultural insights.",
    "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png");
export let decks = [bulgarianDeck, englishDeck, germanDeck, turkishDeck, italianDeck];