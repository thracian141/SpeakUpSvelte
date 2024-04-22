import { browser } from "$app/environment";
import { goto } from "$app/navigation";

export interface User {
    id: number;
    userName: string;
    email: string;
    displayName: string;
    profilePictureUrl: string;
    accountCreatedDate: Date;
    lastDeck: number;
    lastCourse: string;
    dailyWordGoal: number;
}

export interface UserLastDeck {
    deckName : string;
    level : number;
    deckImage : string;
    deckDescription : string;
    isCourse : boolean;
    [key: string]: string | number | boolean;
}

export async function getToken() {
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

export async function getName() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/getname', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.name;
}

export async function learningDeckOverride() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/learn/learningDeck', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const deckNcourse: boolean[] = data.learningDeckLearningCourse;

    return deckNcourse;
}

export async function getUserName() {
    let token = await getToken();
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

export async function getDisplayName() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/getdisplayname', {
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
    return data.displayname;
}

export async function getUser() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/allInfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const user = data.user;
    user.accountCreatedDate = new Date(user.accountCreatedDate).toLocaleDateString('en-GB');
    return user;
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

export async function register(event: Event, username:string, email:string, password:string, displayname:string|null) {
    event.preventDefault();

    const model = {
        UserName: username,
        DisplayName: displayname,
        Password: password,
        Email: email
    };

    const response = await fetch('https://localhost:5000/authenticate/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login successful!");
        document.cookie = `token=${data.token};path=/;Secure;SameSite=Strict;`;
        await goto('/');
        location.reload();
    } else {
        console.error("Login failed: ", data.message);
    }
}

export async function editUsername(currentPassword:string, newUsername:string) {
    let token = await getToken();
    const model = {
        currentPassword,
        newInput: newUsername
    };

    const response = await fetch('https://localhost:5000/account/editusername', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    const data = await response.text();
    return data;
}

export async function editPassword(currentPassword:string, newPassword:string) {
    let token = await getToken();
    const model = {
        currentPassword,
        newInput: newPassword
    };

    const response = await fetch('https://localhost:5000/account/editpassword', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    const data = await response.text();
    return data;
}

export async function editEmail(currentPassword:string, newEmail:string) {
    let token = await getToken();
    const model = {
        currentPassword,
        newInput: newEmail
    };

    const response = await fetch('https://localhost:5000/account/editemail', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    const data = await response.text();
    return data;
}

export async function editDisplayName(currentPassword:string, newDisplayName:string) {
    let token = await getToken();
    const model = {
        currentPassword,
        newInput: newDisplayName
    };

    const response = await fetch('https://localhost:5000/account/editdisplayname', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    });

    const data = await response.text();
    return data;
}

export async function checkIfAdmin() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/checkifadmin', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // if the response is ok, return true, if it is unauthorized, return false
    if (response.ok) {
        return true;
    } else if (response.status == 401) {
        return false;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export async function checkIfDev() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/bugs/checkifdev', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    // if the response is ok, return true, if it is unauthorized, return false
    if (response.ok) 
        return true;
    else 
        return false;
}

export async function searchUsers(search: string) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/searchAccounts?search=${search}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const users: User[] = data.users;
    const roles: string[] = data.userRoles;
    return {users, roles};
}

export async function deleteAccount(userId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/deleteaccount?userId=${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}

export async function amHigherRole(than: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/amhigherrole?than=${than}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        return true;
    } else if (response.status == 401) {
        return false;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }        
}

export async function getRole(userId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/getrole?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}

export async function getOwnRole() {
    let token = await getToken();
    const response = await fetch('https://localhost:5000/account/getownrole', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}

export async function makeDev(userId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/makedev?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}

export async function makeAdmin(userId: number) {
    let token = await getToken();
    const response = await fetch(`https://localhost:5000/account/makeadmin?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        console.log(response);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.text();
}