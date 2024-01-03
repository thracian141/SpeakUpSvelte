<script lang='ts'>
    import { slide } from "svelte/transition";
    import Navbar from "./Navbar.svelte";
    import './styles.css';
    import { onMount } from "svelte";
    import NavbarPhone from "./NavbarPhone.svelte";
    import { decks } from "./decks/testDecks";
  import { browser } from "$app/environment";

    let websiteLanguage = decks[1];
    let theme = 'dark';
    function changeTheme() {
        document.body.classList.toggle('light-theme');
        theme = theme === 'dark' ? 'light' : 'dark';
    }

    let isNarrowScreen = false;
    onMount(() => {
        if (browser) {
            localStorage.setItem('websiteLanguage', JSON.stringify(websiteLanguage));
        }
        isNarrowScreen = window.innerWidth <= window.innerHeight;
        window.addEventListener('resize', () => {
            isNarrowScreen = window.innerWidth <= window.innerHeight;
        });
    });
</script>

<div class="app">
    <button class="change-theme" style="" on:click={changeTheme}>
        {#if theme === 'dark'}
            <i class="bi bi-moon" in:slide out:slide></i>
        {:else}
            <i class="bi bi-brightness-high" in:slide out:slide></i>
        {/if}
        <span>Highly experimental!</span>
    </button>
    {#if !isNarrowScreen}
        <Navbar />
    {:else if isNarrowScreen}
        <NavbarPhone />
    {/if}
    <main style="padding-left: {isNarrowScreen == true ? "0" : "5.5rem"}">
        <div class="wrap" style="padding-left: {isNarrowScreen == true ? "0" : "1rem"};">
            <slot />
        </div>
    </main>
</div>

<style>
    .change-theme {
        position: absolute;
        top: 5%;
        right: 2.5%;
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
        .change-theme > span {
            position: absolute;
            top: 50%;
            left:-110%;
            transform: translate(-50%, -50%);
            padding: 0.5rem;
            background-color: var(--bg-highlight-2);
            color: var(--fg-color);
            border-radius: 0.5rem;
            font-size: 0.75rem;
            opacity: 0;
        }
        .change-theme:hover {
            cursor: pointer;
            background-color:var(--bg-highlight-2);
            color: var(--fg-color);
        }
            .change-theme:hover > span {
                opacity: 1;
            }
    .app {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
        box-sizing: border-box;
        position: relative;
        background-color: var(--bg-color);
        overflow: hidden;
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
</style>