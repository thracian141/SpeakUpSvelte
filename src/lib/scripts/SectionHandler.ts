import { getToken } from "./UserHandler";

export interface SectionInput {
    title: string;
    description: string;
    courseCode: string;
}
export interface Section {
    id: number;
    title: string;
    description:string;
    lastEdited: Date;
    courseCode: string;
    order: number;
    lastEditorId: number;
}

export async function getSectionById(id:number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/section/getbyid?id=${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Error getting section by id');
    }

    const data = await response.json();
    const section:Section = data.section;
    return section;
}

export async function listSectionsByCourse(courseCode:string) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/section/listbycourse?courseCode=${courseCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error listing sections by course');
    }

    const data = await response.json();
    const sections:Section[] = data.sections;
    console.log(sections);
    return sections;
}

export async function createSection(sectionInput: SectionInput) {
    let token = await getToken();
    const response = await fetch("https://localhost:5000/section/create", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sectionInput)
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error creating section');
    }

    const data = await response.text();
    return data;
}

export async function deleteSection(sectionId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/section/delete/${sectionId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error deleting section');
    }

    const data = await response.text();
    return data;
}

export async function orderSectionUp(sectionId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/section/orderup?sectionId=${sectionId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error ordering section up');
    }

    const data = await response.text();
    return data;
}

export async function orderSectionDown(sectionId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/section/orderdown?sectionId=${sectionId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error ordering section down');
    }

    const data = await response.text();
    return data;
}