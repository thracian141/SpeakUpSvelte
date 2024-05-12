<script lang='ts'>
	import { slide } from 'svelte/transition';
    import {searchUsers} from '$lib/scripts/UserHandler';
    import type {User} from '$lib/scripts/UserHandler';
    import {searchDecks, type Deck} from '$lib/scripts/DeckHandler';
    import { onMount } from 'svelte';
    import DeckRow from './DeckRow.svelte';
    import UserRow from './UserRow.svelte';
    import {checkIfAdmin} from '$lib/scripts/UserHandler';
    import {isNarrowScreen} from '$lib/store';
    import { _ } from 'svelte-i18n'

    let ready = false;

    let users: User[] = [];
    let currentData: any;
    let roles: string[] = [];

    let decksData: any = [];
    let decks: Deck[] = [];
    let owners: string[] = [];

    let search = '';
    let isAdmin = false;

    onMount(async()=>{
        isAdmin = await checkIfAdmin();
        let data = await searchUsers('sys');
        users = data.users;
        roles = data.roles;
        ready = true;
    });

    let searchHTML = '';

    // Reactive statement to check if search input contains "@all"
    $: {
        if (search.includes('@all')) {
            searchHTML = search.replace('@all', '<span contenteditable="false" class="blue">@all</span>');
        } else {
            searchHTML = search;
        }
    }
</script>

{#if !isAdmin}
    <h1 >Unauthorized</h1>
{:else if $isNarrowScreen}
    <h1 style="margin: 0 1rem;">Моля посетете страницата от десктоп компютър.</h1>
{:else if ready}
<div class="panel" transition:slide style="position: relative; z-index:999;">
    <h1 style="margin:0; align-self:flex-start; margin-bottom:1rem;">{$_('admin.admin_panel')}</h1>
    <p style="margin: 0; position:absolute; font-size:1.1rem; color:var(--cyan); right:2.5rem; top:2.5rem;">{$_('admin.hint')}</p>
    <div class="wrap-search">
        <div contenteditable="true" id="search" class="search-input" bind:innerHTML={searchHTML} on:input={(e) => search = e.currentTarget.innerHTML}></div>
        {#if search==''}<label for="search" class="search-label">{$_('admin.search_for_user_or_deck')}</label>{/if}
        <button class="search-btn" title="Search users" on:click={async()=>{decks = []; currentData = await searchUsers(search); users = currentData.users; roles = currentData.roles;}}><i class="bi bi-people"></i></button>
        <button class="search-btn" title="Search decks" on:click={async()=>{users = []; roles=[]; decksData = await searchDecks(search); decks = decksData.decks; owners = decksData.owners}}><i class="bi bi-card-list"></i></button>
        <button class="search-btn" title="Clear search" on:click={()=>{search = ''; users = []; roles = []; decks = []}}><i class="bi bi-x"></i></button>
    </div>
    <div class="search-results">
        {#if users.length == 0 && search.length == 0}
            <h3 style="margin:0; color:var(--fg-color); opacity:0.7;">{$_("admin.results_will_appear_here")}...</h3>
        {/if}
        {#each users as user, index}
            {#key user.id}
                <UserRow {user} role={roles[index]} on:delete={async()=>{users = [...users].filter(u => u.id != user.id)}} />
            {/key}
        {/each}
        {#each decks as deck, index}
            {#key deck.id}
                <DeckRow {deck} owner={owners[index]}/>
            {/key}
        {/each}
    </div>
</div>
{/if}


<style>
    .search-label {
        position: absolute;
        left: 3rem;
        font-size: 1.2rem;
        color: var(--fg-color-2);
        height:fit-content;
        pointer-events: none;
    }
    :global(.blue) {
        color: var(--cyan);
        font-weight: bold;
        text-decoration: solid underline var(--cyan);
        border: 1px solid var(--bg-highlight-2);
        box-sizing: content-box;
        padding: 0.2rem 0.5rem;
        border-radius: 0.5rem;
    }
    .panel {
        height: 45rem;
        width: 70rem;
        background-color: var(--el-bg-color);
        border-radius:1rem;
        padding:2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
        .panel > .search-results {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            margin-top: 2rem;
            background-color: var(--bg-color);
            overflow: hidden;
            overflow-y: auto;
            padding: 2rem;
            border: 1px solid var(--bg-highlight);
        }
        .wrap-search {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap:1rem;
        }
            .search-input {
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: left;
                align-items: center;
                width: 100%;
                height: 3rem;
                border-radius: 0.5rem;
                background-color: var(--bg-color);
                color:var(--fg-color);
                border: 1px solid var(--bg-highlight);
                padding: 0.25rem 1rem;
                font-size: 1.2rem;
            }
            .search-btn {
                width: 3rem;
                height: 3rem;
                border-radius: 0.5rem;
                background-color: var(--bg-color);
                color:var(--fg-color);
                border: 1px solid var(--bg-highlight);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                transition: all 0.12s ease-in-out;
            }
                .search-btn:hover {
                    cursor: pointer;
                    background-color: var(--bg-highlight);
                    border: 1px solid var(--bg-highlight-2);
                }
    * { 
        box-sizing: border-box;
    }
</style>