<script lang='ts'>
    import { slide } from "svelte/transition";
    import Navbar from "./Navbar.svelte";
    import './styles.css';
    import { onMount } from "svelte";
    import NavbarPhone from "./NavbarPhone.svelte";
    import { _, locale } from '$lib/i18n';
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { isNarrowScreen } from "$lib/store";
    import { page } from "$app/stores";
    import { isLoggedIn } from "$lib/scripts/UserHandler";

    let theme = 'dark';
    function changeTheme() {
        document.body.classList.toggle('light-theme');
        theme = theme === 'dark' ? 'light' : 'dark';
    }
    function changeLang() {
        $locale === 'en' ? locale.set('bg') : locale.set('en');
        localStorage.setItem('websiteLanguage', JSON.stringify($locale));
        goto('/');
    }

    let loggedIn:boolean;
    
    onMount(async () => {
        loggedIn = await isLoggedIn();
        if (!loggedIn) {
            goto('/welcome');
        } 
        //In Svelte, the check for "browser" toggles client-side rendering
        if (browser) {
            if (localStorage.getItem('websiteLanguage') != null && localStorage.getItem('websiteLanguage') != undefined) {
                locale.set(JSON.parse(localStorage.getItem('websiteLanguage') as string));
            } else {
                locale.set('en');
                localStorage.setItem('websiteLanguage', JSON.stringify($locale));
            }
        }
    })
</script>

<div class="app">
    {#if loggedIn}
    <div style="position: absolute; gap:1rem; display:flex; flex-direction:row; right:10rem; top:2.8rem; {$isNarrowScreen ? "top:1.8rem; right:9rem" : ""}">
        <a href="https://www.instagram.com/speakup.support/" style=" display:flex;flex-direction:row; gap:0.4rem;">
            <i class="bi bi-instagram"></i>
            <span>Support page</span>
        </a>
    </div>   
    <button class="change-theme" on:click={changeTheme} style="{$isNarrowScreen ? "top:1rem; right:0.75rem" : ""}">
        {#if theme === 'dark'}
            <i class="bi bi-moon" in:slide out:slide></i>
        {:else}
            <i class="bi bi-brightness-high" in:slide out:slide></i>
        {/if}
    </button>
    <button class="change-theme" style="right:6rem; {$isNarrowScreen ? "top:1rem; right:5rem;" : ""}" on:click={changeLang}>
        <i class="bi bi-translate" in:slide out:slide></i>
    </button>
    {/if}
    {#if loggedIn}
        {#if !$isNarrowScreen}
            <Navbar />
        {:else if $isNarrowScreen}
            <NavbarPhone />
        {/if}
    {/if}
    <main>
        <div class="wrap" style="{$isNarrowScreen || !loggedIn ? "padding-left:0rem; width:100%;" : ""}">
            <slot />
        </div>
    </main>
</div>

<style>
    .change-theme {
        position: absolute;
        top: 2rem;
        right: 1.5rem;
        border: none;
        background-color:var(--bg-highlight);
        width:3rem;
        height:3rem;
        color: var(--fg-color-2);
        border-radius: 50%;
        z-index: 4;
        font-size: 1.5rem;
        text-align: center;
        transition: all 0.12s ease-in-out;
    }
        .change-theme > i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .change-theme:hover {
            cursor: pointer;
            background-color:var(--bg-highlight-2);
            color: var(--fg-color);
            z-index: 5;
        }
    .app {
		display: flex;
		flex-direction: row;
        min-height: 100%;
        box-sizing: border-box;
        position: relative;
        background-color: var(--bg-color);
        padding: 0 !important;
        align-items: stretch;
        justify-content: stretch;
        overflow: hidden;
        overflow-x: auto;
	}
    main {
        position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
        flex-grow: 1;
        background-color: #00000000;
	}
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    * {
        box-sizing: border-box;
    }
</style>