export interface Deck {
    id: number;
    name: string;
    description: string;
}

export class PersonalDeck implements Deck {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public userId: number;

    constructor(id:number, name:string, description:string, image:string, userId:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.userId = userId;
    }
    
}

export class Course implements Deck {
    public id: number;
    public name: string;
    public nameShort: string;
    public description: string;
    public image: string;
    public sections: Section[];

    constructor(id:number, name:string, nameShort:string, description:string, image:string) {
        this.id = id;
        this.name = name;
        this.nameShort = nameShort;
        this.description = description;
        this.image = image;
        this.sections = [];
    }
}

export class Section {
    public id: number;
    public name: string;
    public description: string;
    public level: number;
    public difficulty: number;
    public courseId: number;
    public cards: Card[];

    constructor(id:number, name:string, description:string, level:number, difficulty:number, courseId:number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.level = level;
        this.difficulty = difficulty;
        this.courseId = courseId;
        this.cards = [];
    }
}

export class Card {
    public id: number;
    public front: string;
    public back: string;
    public partOfSpeech: string;
    public notes?: string;
    public level: number;
    public difficulty: number;
    public sectionId: number;
    public courseId: number;
    public sentences: Sentence[];

    constructor(id:number, front:string, back:string, partOfSpeech:string, notes:string, level:number, difficulty:number, sectionId:number, courseId:number) {
        this.id = id;
        this.front = front;
        this.back = back;
        this.partOfSpeech = partOfSpeech;
        this.notes = notes;
        this.level = level;
        this.difficulty = difficulty;
        this.sectionId = sectionId;
        this.courseId = courseId;
        this.sentences = [];
    }
}

export class Sentence {
    public id: number;
    public front: string;
    public back: string;
    public cardId: number;

    constructor(id:number, front:string, back:string, wordId:number) {
        this.id = id;
        this.front = front;
        this.back = back;
        this.cardId = wordId;
    }
}