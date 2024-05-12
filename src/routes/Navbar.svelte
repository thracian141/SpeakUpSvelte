<script lang='ts'>
    import { browser } from '$app/environment';
	import { page } from '$app/stores';
    import {onMount} from "svelte";
    import * as UserHandler from "../lib/scripts/UserHandler";
    import { _ } from '$lib/i18n';
    import './styles.css';
    import { getLastCourse } from '$lib/scripts/CourseHandler';
    import {checkIfAdmin, checkIfDev} from '$lib/scripts/UserHandler';
    
    let isExpanded = false;
    let isLogoutConfirmed = false;
    let isLoggedIn = UserHandler.isLoggedIn();
    let username = '';
    let lastCourse:any|undefined = undefined;
    let isAdmin = false;
    let isDev = false;

    if (browser && localStorage.getItem('isExpanded') === "true") {
        isExpanded = true;
    }
    function logout() {
        console.log("Test function called");
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
    function enableExpansion() {
        if (browser) {
            isExpanded = true;
            localStorage.setItem('isExpanded', String(isExpanded));
        }
    }
    function disableExpansion() {
        if (browser) {
            isExpanded = false;
            localStorage.setItem('isExpanded', String(isExpanded));
        }
    } 
    let currentPath;
    onMount(async () => {
        lastCourse = await getLastCourse();
        isAdmin = await checkIfAdmin();
        isDev = await checkIfDev();
        if (isAdmin)
            isDev = true;
        currentPath = window.location.pathname;
        if (await isLoggedIn) {
            username = await UserHandler.getUserName();
        }
    });
</script>



<nav id="nav" on:mouseenter={enableExpansion} on:mouseleave={disableExpansion} 
     class={isExpanded ? 'nav-expanded' : ''}
    >
    <a href="{isAdmin ? "/adminpanel" : "/"}" class="logo" style="display: flex; flex-direction:row; color:var(--fg-color)">
        <img src="/logo.svg" alt="SpeakUp Logo"/>
        <p>SPEAK <span>-</span>UP</p>
    </a>
    <ul id="mainOptions" style="list-style-type:none; padding: 0.5rem;">
        <a href="/" class="nav-option" class:active={$page.url.pathname == "/"}>
            <i class="bi bi-house-door"></i><p>{$_('layout.home')}</p>
        </a>
        <a href="/learn" class="nav-option" class:active={$page.url.pathname.includes("/learn")}>
            <i class="bi bi-play-btn"></i><p>{$_('layout.learn')}</p>
        </a>
        <a href="{lastCourse != null ? "/decks/all" : "/decks"}" class="nav-option" class:active={$page.url.pathname.includes("/decks")}>
            <i class="bi bi-card-list"></i><p>{$_('layout.decks')}</p>
        </a>
        {#if isDev}
        <a href="/create" class="nav-option" class:active={$page.url.pathname.includes('/create')}>
            <i class="bi bi-pencil-square"></i><p>{$_('layout.create')}</p>
        </a>
        <a href="/bugs" class="nav-option" class:active={$page.url.pathname.includes('/bugs')}>
            <i class="bi bi-bug"></i><p>{$_('layout.bug_reports')}</p>
        </a>
        {/if}
        <a href="/account" class="nav-option" class:active={$page.url.pathname.includes('/account')}>
            <i class="bi bi-person" style="font-size:2.7rem; margin-left:-0.2rem;"></i><p>{$_('layout.account')}</p>
        </a>
    </ul>
    {#await isLoggedIn then bool}
        {#if !bool}
            <ul style="list-style-type:none; padding: 12px; margin-top:auto">
                <a id="authForm" class="nav-option" href="/authenticate/login" class:active={$page.url.pathname.includes("/authenticate")}>
                    <i class="bi bi-box-arrow-in-left"></i>
                    <p style="text-overflow:clip; white-space:nowrap">{$_('layout.sign in')}</p>
                </a>
            </ul>
        {:else}
            <ul style="list-style-type:none; padding: 12px; margin-top:auto">
                <a id="authForm" class="nav-option" href="/" class:active={isLogoutConfirmed} on:click|preventDefault={handleLogoutClick}>
                    <i class="bi bi-box-arrow-right"></i>
                    <p style="text-overflow:clip; white-space:nowrap">{isLogoutConfirmed ? `${$_('layout.confirm')}` : `${$_('layout.sign_out')}`}</p>
                </a>
            </ul>
        {/if}
    {/await}
</nav>


<style>
    .logo {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 1.2rem; padding-top: 1.2rem; padding-right: 1.2rem;
    }
    .logo p {
        font-weight: bold;
        font-size: 1rem;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        text-wrap: nowrap;
        position: relative;
        word-spacing: 0.1rem;
    }
        .logo p span {
            position: absolute;
            color: #00000000;
            background-color: var(--selected-text);
            height:0.25rem;
            width: 0.3rem;
            top:52%;
            z-index: -1;
            left:66.5%;
            box-shadow: 0 0 1px 1px var(--el-bg-color);
            transform: translate(-50%, -50%) scaleX(1.3);
        }
    .logo img {
        margin-right:0.2rem;
        width:auto;
        height:3.3rem;
    }
    nav {
        z-index: 999;
        align-self: stretch;
        min-height: 100vh;
        width: 5.5rem;
        background-color: var(--el-bg-color);
        transition: width 0.3s ease-in-out;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        pointer-events:painted;
        box-shadow: var(--bg-middle) 0 0 40px 10px;
    }
    .nav-expanded {
        width: 12rem;
    }
    .nav-option {
        display:flex;
        flex-direction: row;
        padding-left: 0.9rem; padding-right: 1rem;
        font-size:1rem;
        justify-content: space-between;
        border-radius: 12px;
        width:52%;
        height: 3.8rem;
        transition: background-color 0.2s ease-in-out, width 0.2s ease-in-out;
        align-items: center;
        color:var(--fg-color-2);
        transition: all 0.1s ease-in-out;
    }
    .active {
        background-color: var(--selected-color) !important;
        color: var(--fg-color) !important;
    }
    .nav-option > i {
        font-size: 2.3rem;
    }
    .nav-option p {
        font-size: 0.9rem;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        line-height: 2rem;
    }
    nav:hover .nav-option p, nav:hover .logo p {
        opacity: 1;
    }
    nav:hover .nav-option {
        width:80%;
    }
    .nav-option:hover {
        background-color: var(--bg-color);
        color: var(--fg-color);
    }
</style>