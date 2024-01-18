import { browser } from "$app/environment";

export interface User {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    profilePictureUrl: string;
    accountCreatedDate: string;
    lastDeck: string;
    [key: string]: string;
}

export interface UserLastDeck {
    deckName : string;
    level : number;
    deckImage : string;
    deckDescription : string;
    isCourse : boolean;
    [key: string]: string | number | boolean;
}

async function getToken() {
    let cookie;
    if (browser) {
        cookie = document.cookie.split('; ').find(row => row.startsWith('token'));
    }
    if (!cookie) {
        console.log('Token not found');
        return;
    }

    const token = cookie.split('=')[1];
    return token;
}

export async function getUserName() {
    let token = await getToken();
    console.log(token);
    const response = await fetch('https://localhost:5000/account/getusername', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data == null || data == undefined) {
        return null;
    }
    return data.username;
}

export async function getUser() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.userInfo;
}

export async function isLoggedIn() {
    let cookie;
    if (browser){
        cookie = document.cookie.split('; ').find(row => row.startsWith('token'));
    }
    if (!cookie) {
        return false;
    }

    return true;
}

export async function getPfp(profilePictureUrl: string) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/profilepicture?profilePictureUrl=${encodeURIComponent(profilePictureUrl)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
}

export async function getLastDeck(userLastDeckId : number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/userlastdeck?userLastDeckId=${userLastDeckId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return response.json();
}