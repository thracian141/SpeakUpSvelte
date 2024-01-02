export class Deck {
    public name: string;
    public description: string;
    public image: any;

    constructor(name: string, description: string, imageUrl: string, image?: any) {
        this.name = name;
        this.description = description;
        this.image = null;
        this.loadImage(imageUrl);
    }

    async loadImage(imageUrl: string) {
        const response = await fetch(imageUrl);
        const data = await response.blob();
        this.image = data;
    }
}

let bulgarianDeck = new Deck('Bulgarian', "Bulgarian, spoken by 10 million people, offers opportunities for travel and business. Learning it can ease understanding of other Slavic languages. This course covers basic Bulgarian grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png");
let englishDeck = new Deck('English', "English is the most widely spoken language in the world. Learning it can open doors to business, travel, and culture. This course covers basic English grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://openclipart.org/image/2400px/svg_to_png/168121/US-UK-Flag.png");
let germanDeck = new Deck('German', "German is the most widely spoken language in the European Union. Learning it can open doors to business, travel, and culture. This course covers basic German grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/German-Language-Flag.svg/1024px-German-Language-Flag.svg.png");
let turkishDeck = new Deck('Turkish', "Turkish is spoken by around 90 million people. Learning it can open doors to business, travel, and culture. This course covers basic Turkish grammar, vocabulary, pronunciation, and cultural insights.", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png");

export let decks = [bulgarianDeck, englishDeck, germanDeck, turkishDeck];