<script lang="ts">
    import {goto} from '$app/navigation';
    import { slide } from 'svelte/transition';
    import '../styles.css';

    let password = '';
    let email = '';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const model = {
            Email: email,
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

<div class="form-wrap" on:submit={handleSubmit} in:slide={{duration:500}}>
    <h2>Sign in</h2>
    <form method="post" style="position: relative;">
        <div class="form-section">
            <img src="/icons/emailicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={email !== ''} class="form-label" >Email</p>
            <input type="text" class="form-control" bind:value={email}/>
        </div>
        <div class="form-section">
            <img src="/icons/passwordicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={password !== ''} class="form-label" >Password</p>
            <input type="password" class="form-control" bind:value={password} />
        </div>
        <div style="width:80%; height:20%; display: flex; flex-direction:row; align-items:center; justify-content:space-between; 
            margin-top:auto; margin-bottom:1rem; margin-top:4rem;">
            <button type="submit" class="submit-button" >
                Log in
            </button>
            <div style="display: flex; flex-direction:column; justify-content:space-between;">
                <a href="/" style="font-size: 11pt !important; ">Forgot your password?</a>
                <div style="width: 100%; height:1px; background-color:var(--bg-color); margin:0.5rem 0 0.5rem 0"></div>
                <a href="../authenticate/register" style="font-size: 11pt !important;">Don't have an account?</a>
            </div>
        </div>
    </form>
</div>
