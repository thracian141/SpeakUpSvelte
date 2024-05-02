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
        <div class="logo" style="display: flex; flex-direction:row;">
            <img src="/logo.svg" alt="SpeakUp Logo"/>
            <p>SPEAK <span>-</span>UP</p>
        </div>
        <button class="nav-button" on:click={()=>isOpen=false}>
            <i class="bi bi-list-nested"></i>
        </button>
    </div>
    <div class="nav-center">
        <a href="/" class="nav-option" class:active={$page.url.pathname == "/"}>
            <i class="bi bi-house-door"></i><p>{$_('layout.home')}</p>
        </a>
        <a href="/learn" class="nav-option" class:active={$page.url.pathname.includes("/learn")}>
            <i class="bi bi-play-btn"></i><p>{$_('layout.learn')}</p>
        </a>
        <a href="/decks" class="nav-option" class:active={$page.url.pathname.includes("/decks")}>
            <i class="bi bi-card-list"></i><p>{$_('layout.decks')}</p>
        </a>
        {#if true}
        <a href="/create" class="nav-option" class:active={$page.url.pathname.includes('/create')}>
            <i class="bi bi-pencil-square"></i><p>{$_('layout.create')}</p>
        </a>
        {/if}
        <a href="/account" class="nav-option" class:active={$page.url.pathname.includes('/account')}>
            <i class="bi bi-person" style="font-size:5rem; margin-left:-0.5rem;"></i><p>{$_('layout.account')}</p>
        </a>
    </div>
    <div class="nav-bottom">
        {#await isLoggedIn then bool}
            {#if !bool}
            <a id="authForm" class="nav-option" href="/authenticate/login" class:active={$page.url.pathname.includes("/authenticate")}>
                <i class="bi bi-box-arrow-in-left" style="margin-left: 0.5rem !important; font-size:5rem"></i>
                <p style="text-overflow:clip; white-space:nowrap">{$_('layout.sign in')}</p>
            </a>
            {:else}
            <a id="authForm" class="nav-option" href="/" class:active={isLogoutConfirmed} on:click|preventDefault={handleLogoutClick}>
                <i class="bi bi-box-arrow-right" style="margin-left: 0.5rem !important; font-size:5rem"></i>
                <p style="text-overflow:clip; white-space:nowrap">{isLogoutConfirmed ? 'Confirm' : 'Sign Out'}</p>
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
        height: 7rem;
        padding:1rem;
        justify-content: space-between;
        border-radius: 0.8rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--bg-color);
        align-items: center;
    }
        .nav-option > i {
            font-size: 4rem;
            margin-right: 1rem;
        }
        .nav-option > p {
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
                height: 5rem;
                width: 5rem;
                margin:0;
            }
            .logo > p {
                font-weight: bold;
                font-size: 2.5rem;
                position: relative;
                margin:0;
                margin-left: 1rem;
                line-height: 5.5rem;
            }
                .logo p span {
                    position: absolute;
                    color: #00000000;
                    background-color: var(--selected-text);
                    height:0.4rem;
                    width: 0.5rem;
                    top:52%;
                    z-index: -1;
                    left:67%;
                    box-shadow: 0 0 1px 1px var(--el-bg-color);
                    transform: translate(-50%, -50%) scaleX(1.3);
                }
    .nav {
        position: absolute;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        height: 100%;
        width: 0vw;
        background-color: var(--el-bg-color);
        transition: width 0.3s ease-in-out;
        z-index: 998;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
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
        z-index: 999;
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