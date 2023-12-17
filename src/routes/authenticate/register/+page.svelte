<script lang="ts">
	import { slide } from 'svelte/transition';
    import {goto} from '$app/navigation';
    import '../styles.css';

    let username = '';
    let displayname = '';
    let password = '';
    let confirmpassword = '';
    let email = '';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const model = {
            UserName: username,
            Password: password,
        };

        const response = await fetch('https://localhost:5000/auth/login', {
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
</script>

<div class="form-wrap" on:submit={handleSubmit} in:slide={{duration:750}}>
    <h2 style="display: flex; flex-direction:row; align-items:center">
        Sign up to <img style="height:2rem; margin: 0 0.25rem 0 0.6rem" src="/icons/speakuplogo.svg" alt="logo"/> 
        SPEAKUP
    </h2>
    <form method="post" style="position: relative;">
        <div class="form-section">
            <img src="/icons/usernameicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={username !== ''} class="form-label" >Username</p>
            <input type="text" class="form-control" bind:value={username}/>
            <span>*</span>
        </div>
        <div class="form-section">
            <img src="/icons/person-badge.svg" alt="Display name Icon" class="form-icon"/>
            <p class:label-filled={username !== ''} class="form-label" >Display Name</p>
            <input type="text" class="form-control" bind:value={username}/>
        </div>
        <div class="form-section">
            <img src="/icons/emailicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={email !== ''} class="form-label" >Email</p>
            <input type="text" class="form-control" bind:value={email}/>
            <span>*</span>
        </div>
        <div class="form-section">
            <img src="/icons/passwordicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={password !== ''} class="form-label" >Password</p>
            <input type="password" class="form-control" bind:value={password} />
            <span>*</span>
        </div>
        <div class="form-section">
            <p class:label-filled={confirmpassword !== ''} class="form-label" >Confirm Password</p>
            <input type="password" class="form-control" bind:value={confirmpassword} style="padding-left: 3.5rem;" />
            <span>*</span>
        </div>
        <div style="width:80%; height:20%; display: flex; flex-direction:row; align-items:center; justify-content:space-between; 
            margin-top:auto; margin-bottom:1rem; margin-top:4rem;">
            <button type="submit" class="submit-button" >
                Register
            </button>
            <a href="./login" style="font-size: 11pt !important;">Already have an account?</a>
        </div>
    </form>
</div>

<style>
    .form-section > span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -2%;
        color: #faaa5a;
        font-weight: bold;
        font-size: 1.1rem;
    }
</style>