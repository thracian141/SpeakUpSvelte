import { browser } from "$app/environment";
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
    if (browser) {
        cookie = document.cookie.split('; ').find(row => row.startsWith('token'));
    }
    if (!cookie) {
        return false;
    }
    const token = cookie.split('=')[1];
    const response = await fetch('https://localhost:5000/account/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        if (browser) {
            localStorage.setItem('isLoggedIn', 'false');
        }
        return false;
    }
    if (browser) {
        localStorage.setItem('isLoggedIn', 'true');
    }
    return true;
}
export async function getPfp(profilePictureUrl) {
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
export async function getLastDeck(userLastDeckId) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/userlastdeck?userLastDeckId=${userLastDeckId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
//# sourceMappingURL=UserManager.js.map