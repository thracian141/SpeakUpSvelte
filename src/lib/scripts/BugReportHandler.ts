import type { CourseCard } from "./CardHandler";
import { getToken, type User } from "./UserHandler";

export interface BugReport {
    id: number;
    text: string;
    courseCode: string;
    reporterId: number;
    reporter: User;
    cardId: number;
    card: CourseCard;
}

export async function sendBugReport(text: string, courseCode: string, cardId: number) {
    let token = await getToken();
    const model = {
        text: text,
        courseCode: courseCode,
        cardId: cardId
    };
    
    const response = await fetch("https://localhost:5000/bugs/reportbug", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    if (!response.ok) {
        throw new Error('Error sending bug report');
        console.log(response);
    } else {
        const data = await response.text();
        return data;
    }
}

export async function listBugReports(courseCode:string) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/bugs/listbugs?courseCode=${courseCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error listing bug reports');
    } else {
        const data = await response.json();
        const bugReports: BugReport[] = data.bugs;
        return bugReports;
    }
}

export async function resolveBug(id: number) {
    let token = await getToken();

    const response = await fetch(`https://localhost:5000/bugs/resolvebug?id=${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error resolving bug');
    } else {
        const data = await response.text();
        return data;
    }
}