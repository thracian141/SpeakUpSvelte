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

    onMount(() => {
        if (browser) {
            if (localStorage.getItem('websiteLanguage') != null && localStorage.getItem('websiteLanguage') != undefined) {
                locale.set(JSON.parse(localStorage.getItem('websiteLanguage') as string));
            } else {
                locale.set('en');
                localStorage.setItem('websiteLanguage', JSON.stringify($locale));
            }
        }
    });
</script>

<div class="app">
    {#if $page.url.pathname != "/learn" && $page.url.pathname != "/learn/"}
    <button class="change-theme" on:click={changeTheme} style="{$isNarrowScreen ? "top:1rem; right:0.75rem" : ""}">
        {#if theme === 'dark'}
            <i class="bi bi-moon" in:slide out:slide></i>
        {:else}
            <i class="bi bi-brightness-high" in:slide out:slide></i>
        {/if}
        <span>{$_("layout.highly_experimental")}</span>
    </button>
    <button class="change-theme" style="right:6rem; {$isNarrowScreen ? "top:1rem; right:5rem;" : ""}" on:click={changeLang}>
        <i class="bi bi-translate" in:slide out:slide></i>
        <span>{$_("layout.highly_experimental")}</span>
    </button>
    {/if}
    {#if !$isNarrowScreen}
        <Navbar />
    {:else if $isNarrowScreen}
        <NavbarPhone />
    {/if}
    <main style="padding-left: {$isNarrowScreen == true ? "0" : "5.5rem"}">
        <div class="wrap" style="{$isNarrowScreen ? "padding-left:0rem; width:100%;" : "padding-left:1rem;"}">
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
        .change-theme > span {
            position: absolute;
            top: 50%;
            right:100%;
            transform: translate(0%, -50%);
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
            z-index: 5;
        }
            .change-theme:hover > span {
                opacity: 1;
                z-index: 4;
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