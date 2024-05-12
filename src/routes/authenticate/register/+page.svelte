<script lang="ts">
	import { slide } from 'svelte/transition';
    import {goto} from '$app/navigation';
    import '../styles.css';
    import { isNarrowScreen } from '$lib/store';
    import {_} from '$lib/i18n';
    import { url } from '$lib/url';

    let username = '';
    let displayname = '';
    let password = '';
    let confirmpassword = '';
    let email = '';

    let error = '';

    export async function handleSubmit(event: Event) {
        event.preventDefault();

        const model = {
            UserName: username,
            DisplayName: displayname,
            Email: email,
            Password: password,
            CourseCode: 'none'
        };

        const response = await fetch(`${url}/authenticate/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(model),
        });

        if (!response.ok) {
            const data = await response.json();
            error = data.errors;
            return;
        }

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

<div class="form-wrap" on:submit={handleSubmit} in:slide={{duration:750}} 
style="{$isNarrowScreen ? "width:100%; padding: 1rem 0.2rem; height:100%; margin-top:5rem; border-radius:0;" : ""}">
    <h2 style="display: flex; flex-direction:row; align-items:center; {$isNarrowScreen ? "font-size:2rem;" : ""}">
        {$_('authenticate.sign_up_to')} <img style="height:2rem; margin: 0 0.25rem 0 0.6rem" src="/icons/speakuplogo.svg" alt="logo"/> 
        SPEAKUP
    </h2>
    <form method="post" style="position: relative;">
        <div class="form-section">
            <img src="/icons/usernameicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={username !== ''} class="form-label" >{$_('authenticate.username')}</p>
            <input type="text" name="username" class="form-control" bind:value={username}/>
            <span>*</span>
        </div>
        <div class="form-section">
            <img src="/icons/person-badge.svg" alt="Display name Icon" class="form-icon"/>
            <p class:label-filled={displayname !== ''} class="form-label" >{$_('authenticate.display_name')}</p>
            <input type="text" name="fullname" class="form-control" bind:value={displayname}/>
        </div>
        <div class="form-section">
            <img src="/icons/emailicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={email !== ''} class="form-label" >{$_('authenticate.email')}</p>
            <input type="text" name="email" class="form-control" bind:value={email}/>
            <span>*</span>
        </div>
        <div class="form-section">
            <img src="/icons/passwordicon.svg" alt="Username Icon" class="form-icon"/>
            <p class:label-filled={password !== ''} class="form-label" >{$_('authenticate.password')}</p>
            <input type="password" name="password" class="form-control" bind:value={password} />
            <span>*</span>
        </div>
        <div class="form-section">
            <p class:label-filled={confirmpassword !== ''} class="form-label" >{$_('authenticate.confirm_password')}</p>
            <input type="password" name="confirmpassword" class="form-control" bind:value={confirmpassword} style="padding-left: 3.5rem;" />
            <span>*</span>
        </div>
        {#if error}
            <div transition:slide style="width:100%; margin-top:2rem; text-align:center; color:var(--red); font-size:1.2rem;">{error}</div>
        {/if}
        <div style="width:80%; height:20%; display: flex; {$isNarrowScreen ? "flex-direction:column-reverse; gap:30%; margin-top:auto; " : "flex-direction:row; justify-content:space-between; margin-top:4rem;"}  align-items:center; margin-bottom:1rem; ">
            <button type="submit" class="submit-button" >
                {$_('authenticate.register')}
            </button>
            <a href="../authenticate/login" style="font-size: 11pt !important;">{$_('authenticate.already_have_an_account')}</a>
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