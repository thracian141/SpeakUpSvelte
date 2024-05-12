import { goto } from "$app/navigation";
import { getToken } from "./UserHandler";
import { url } from "$lib/url";

export interface Course {
    courseCode: string;
    title: string;
    description: string;
    image: string;
}
const bulgarian: Course = {
    courseCode: "en-to-bg",
    title: "Bulgarian",
    description: "Bulgarian, spoken by 10 million people, offers opportunities for travel and business. Learning it can ease understanding of other Slavic languages. This course covers basic Bulgarian grammar, vocabulary, pronunciation, and cultural insights.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png"
}
const english: Course = {
    courseCode: "bg-to-en",
    title: "Английски",
    description: "Английският е най-широко разпространеният език в света. Неговото учене може да отвори врати към бизнеса, пътуванията и културата. Този курс обхваща основна граматика, лексика, произношение и културни познания на английски.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png"
}
const german: Course = {
    courseCode: "en-to-de",
    title: "German",
    description: "German is the most widely spoken language in the European Union. Learning it can open doors to business, travel, and culture. This course covers basic German grammar, vocabulary, pronunciation, and cultural insights.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png"
}
const turkish: Course = {
    courseCode: "en-to-tr",
    title: "Turkish",
    description: "Turkish is spoken by around 90 million people. Learning it can open doors to business, travel, and culture. This course covers basic Turkish grammar, vocabulary, pronunciation, and cultural insights.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png"
}
const italian: Course = {
    courseCode: "en-to-it",
    title: "Italian",
    description: "Italian is spoken by around 85 million people. Learning it can open doors to business, travel, and culture. This course covers basic Italian grammar, vocabulary, pronunciation, and cultural insights.",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png"
}

export async function getCourseByCode(courseCode:string) {
    switch (courseCode) {
        case "bg-to-en":
            return english;
        case "en-to-bg":
            return bulgarian;
        case "en-to-de":
            return german;
        case "en-to-tr":
            return turkish;
        case "en-to-it":
            return italian;
        default:
            throw new Error('Course not found');
    }
}
export async function getCourseNameByCode(courseCode:string) {
    switch (courseCode) {
        case "bg-to-en":
            return "Английски";
        case "en-to-bg":
            return "Bulgarian";
        case "en-to-de":
            return "German";
        case "en-to-tr":
            return "Turkish";
        case "en-to-it":
            return "Italian";
        default:
            throw new Error('Course not found');
    }
}

export async function getLastCourse() {
    let token = await getToken();
    const response = await fetch(`${url}/course/getlast`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok && response.status !== 404) 
        throw new Error('Error getting last course');
    if (response.status === 404)
        return null;
    
    const data = await response.text();
    const courseCode = data;
    const course = await getCourseByCode(courseCode);
    return course;
}

export async function setActiveCourse(courseCode: string) {
    let token = await getToken();
    const response = await fetch(`${url}/course/setactive`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseCode)
    });

    if (!response.ok) 
        throw new Error('Error setting active course');

    const code = await response.text();
    return code;
}

export async function changeActiveCourse(courseCode: string) {
    let token = await getToken();
    const response = await fetch(`${url}/course/changeactive`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(courseCode)
    });

    if (!response.ok) 
        throw new Error('Error changing active course');

    const code = await response.text();
    goto('/')
    return code;
}

export async function listActiveCourses() {
    let token = await getToken();
    const response = await fetch(`${url}/course/getactive`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error('Error listing active courses');
    }

    const data = await response.json();
    const courseCodes = data.activeCourses;

    let courseList: Course[] = [];
    for (let i = 0; i < courseCodes.length; i++) {
        const course = await getCourseByCode(courseCodes[i]);
        await courseList.push(course);
    }

    return courseList;
}

export async function removeActiveCourse(courseCode: string) {
    let token = await getToken();
    const response = await fetch(`${url}/course/removeactive?courseCode=${courseCode}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) 
        throw new Error('Error removing active course');

    const code = await response.text();
    return code;
}

export async function getLastEdit(courseCode: string) {
    let token = await getToken();
    const response = await fetch(`${url}/course/getlastedit?courseCode=${courseCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error getting last edit');
    
    const data = await response.json();
    const date = data.date;
    const username = data.username;
    console.log(data)

    let lastEditTuple = {date, username};
    return lastEditTuple;
}

export async function listActiveCourseCodes() {
    let token = await getToken();
    const response = await fetch(`${url}/course/listactivecoursecodes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error listing active course codes');

    const data = await response.json();
    const courseCodes:string[] = data.courses;

    return courseCodes;
}

export async function getCoursePerformance(courseCode: string) {
    let token = await getToken();
    const response = await fetch(`${url}/course/getCoursePerformance?courseCode=${courseCode}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error getting learned words count');

    const data = await response.json();
    return data;
}

export async function getLastCourseCode() {
    let token = await getToken();
    const response = await fetch(`${url}/course/getLastCourseCode`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) 
        throw new Error('Error getting last course code');

    const data = await response.text();
    return data;
}