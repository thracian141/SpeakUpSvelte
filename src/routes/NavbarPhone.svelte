<script lang="ts">
    import { page } from '$app/stores';
    import * as UserHandler from "../lib/scripts/UserHandler";
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { _, locale } from '$lib/i18n';
    let isOpen = false;

    let isLogoutConfirmed = false;
    let isLoggedIn: boolean | undefined;
    function logout() {
        if (browser){
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            location.href = '/';
            location.reload();
        }
    }
    function handleLogoutClick(event: Event) {
        event.preventDefault();
        if (isLogoutConfirmed) {
            logout();
            isLogoutConfirmed = false;

            if (browser){
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
            }
        } else {
            isLogoutConfirmed = true;
        }
    }
    onMount(async () => {
        isLoggedIn = await UserHandler.isLoggedIn();
        await document.querySelectorAll('.nav-option').forEach((element) => {
            element.addEventListener('click', () => {
                setTimeout(() => {
                    isOpen = false;
                }, 100);
            });
        });
    });
</script>

{#if !isOpen}
    <button class="nav-button open" on:click={()=>isOpen=true}>
        <i class="bi bi-list"></i>
    </button>
{/if}
<nav class="nav" class:nav-open={isOpen}>
    <div class="nav-top">
        <div class="logo">
            <img src="/logo.svg" alt="SpeakUp Logo"/>
            <span>SPEAKUP</span>
        </div>
        <button class="nav-button" on:click={()=>isOpen=false}>
            <i class="bi bi-list-nested"></i>
        </button>
    </div>
    <div class="nav-center">
        <a href="/" class="nav-option" class:active={$page.url.pathname == "/"}>
            <img src="/icons/homeicon.svg" alt="Home Icon" /><span>{$_('layout.home')}</span>
        </a>
        <a href="/learn" class="nav-option" class:active={$page.url.pathname == "/learn" || $page.url.pathname == "/learn/"}>
            <img src="/icons/cardsicon.svg" alt="Learn Icon" /><span>{$_('layout.learn')}</span>
        </a>
        <a href="/decks" class="nav-option" class:active={$page.url.pathname == "/decks" || $page.url.pathname == "/decks/"}>
            <img src="/icons/decksIcon.svg" alt="Decks Icon" /><span>{$_('layout.decks')}</span>
        </a>
        <a href="/create" class="nav-option" class:active={$page.url.pathname.includes("create")}>
            <i class="bi bi-pencil-square"></i><span>{$_('layout.create')}</span>
        </a>
        <a href="/account" class="nav-option" class:active={$page.url.pathname == "/account/" || $page.url.pathname == "/account"}>
            <img src="/icons/accounticon.svg" alt="Account Icon" /><span>{$_('layout.account')}</span>
        </a>
    </div>
    <div class="nav-bottom">
        {#await isLoggedIn then bool}
            {#if !bool}
                <a id="authForm" class="nav-option" href="/authenticate/login" 
                class:active={$page.url.pathname == "/authenticate/login" || $page.url.pathname == "/authenticate" || $page.url.pathname == "/authenticate/" || $page.url.pathname == "/authenticate/login/" }>
                    <img src="/icons/loginicon.svg" alt="Authenticate Icon" />
                    <span>{$_('layout.sign in')}</span>
                </a>
            {:else}
                <a id="authForm" class="nav-option" href="/" class:active={isLogoutConfirmed} on:click|preventDefault={handleLogoutClick}>
                    <img src="/icons/logouticon.svg" alt="Authenticate Icon" />
                    <span>{isLogoutConfirmed ? 'Confirm' : 'Sign Out'}</span>
                </a>
            {/if}
        {/await}
    </div>
</nav>


<style>
    i {
        margin-left: -0.4rem;
        font-size: 2.75rem;
    }
    .active {
        background-color: var(--selected-color) !important;
    }
    .active span, .active img {
        filter: brightness(0) saturate(100%) invert(100%) sepia(13%) saturate(6304%) hue-rotate(178deg) brightness(82%) contrast(93%);
    }
    .nav-bottom {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        box-sizing: border-box;
        margin-top: auto;
        margin-bottom: 1rem;
    }
    .nav-center {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        box-sizing: border-box;
    }
    .nav-option {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        height: 10vh;
        padding:1rem;
        justify-content: space-between;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--bg-color);
        align-items: center;
    }
        .nav-option > img {
            height: 100%;
            aspect-ratio: 1/1;
            margin-right: 1rem;
        }
        .nav-option > span {
            font-size: 5.5vw;
            text-align: center;
            margin: 0;
        }
    .nav-top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1.5rem;
    }
        .logo {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
            .logo > img {
                height: 4rem;
                width: 4rem;
                margin:0;
            }
            .logo > span {
                font-weight: bold;
                font-size: 2rem;
                margin-left: 1rem;
                line-height: 3.5rem;
            }
    .nav {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 0vw;
        background-color: var(--el-bg-color);
        transition: width 0.3s ease-in-out;
        z-index: 5;
        overflow: hidden;
        box-sizing: border-box;
    }
        .nav-open {
            width: 100vw;
        }

    .nav-button {
        background: none;
        border: none;
        font-size: 2.5rem;
        height:2.5rem;
        width:2.5rem;
        text-align: center;
        padding: 0;
        color: var(--fg-color);
        transition: color 0.1s ease-in-out;
        z-index: 5;
    }
        .nav-button:focus {
            color: var(--fg-color-2);
        }
    .open {
        position: absolute;
        top:1rem;
        left:1rem;
    }
</style>