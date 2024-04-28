<script lang="ts">
    import {goto} from '$app/navigation';
    import { slide } from 'svelte/transition';
    import {_} from '$lib/i18n';
    import '../styles.css';
    import { isNarrowScreen } from '$lib/store';
    import { url } from '$lib/url';

    let password = '';
    let email = '';

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const model = {
            Email: email,
            Password: password,
        };
        console.log(model);
        const response = await fetch(`${url}/authenticate/login`, {
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

<div class="form-wrap" on:submit={handleSubmit} in:slide={{duration:500}}
style="{$isNarrowScreen ? "width:100%; padding: 1rem 0.2rem; border-radius:0;" : ""}">
    <h2 style="{$isNarrowScreen ? "font-size:2rem;" : ""}">{$_('authenticate.sign_in')}</h2>
    <form method="post" style="position: relative;">
        <div class="form-section">
            <i class="bi bi-at"></i>
            <p class:label-filled={email !== ''} class="form-label" >{$_('authenticate.email')}</p>
            <input type="text" name="email" id="email" class="form-control" bind:value={email}/>
        </div>
        <div class="form-section">
            <i class="bi bi-key" style="font-size: 2.4rem;"></i>
            <p class:label-filled={password !== ''} class="form-label" >{$_('authenticate.password')}</p>
            <input type="password" name="password" id="password" class="form-control" bind:value={password} />
        </div>
        <div style="width:80%; {$isNarrowScreen ? "flex-direction:column;" : "flex-direction:row;height:20%;"}  display: flex; align-items:center; justify-content:space-between; 
            margin-top:auto; margin-bottom:1rem; margin-top:4rem;">
            <button type="submit" class="submit-button" >
                {$_('authenticate.log_in')}
            </button>
            <div style="display: flex; flex-direction:column; justify-content:space-between; {$isNarrowScreen ? "margin-top:2rem;" : ""}">
                <a href="/" style="font-size: 11pt !important; ">{$_('authenticate.forgot_your_password')}</a>
                <div style="width: 100%; height:1px; background-color:var(--bg-color); margin:0.5rem 0 0.5rem 0"></div>
                <a href="/authenticate/register" style="font-size: 11pt !important;">{$_('authenticate.dont_have_an_account')}</a>
            </div>
        </div>
    </form>
</div>
