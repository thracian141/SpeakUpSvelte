<script lang='ts'>
	import { slide } from 'svelte/transition';
    import {searchUsers} from '$lib/scripts/UserHandler';
    import type {User} from '$lib/scripts/UserHandler';
    import {searchDecks, type Deck} from '$lib/scripts/DeckHandler';
    import { onMount } from 'svelte';
    import DeckRow from './DeckRow.svelte';
    import UserRow from './UserRow.svelte';

    let ready = false;

    let users: User[] = [];
    let currentData: any;
    let roles: string[] = [];
    let decks: Deck[] = [];
    let search = '';

    onMount(async()=>{
        let data = await searchUsers('sys');
        users = data.users;
        roles = data.roles;
        ready = true;
    });
</script>

{#if ready}
<div class="panel" transition:slide style="position: relative; z-index:999;">
    <h1 style="margin:0; align-self:flex-start; margin-bottom:1rem;">Admin Panel</h1>
    <div class="wrap-search">
        <input type="text" placeholder="Search for a user or deck" bind:value={search}/>
        <button class="search-btn" title="Search users" on:click={async()=>{decks = []; currentData = await searchUsers(search); users = currentData.users; roles = currentData.roles;}}><i class="bi bi-people"></i></button>
        <button class="search-btn" title="Search decks" on:click={async()=>{users = []; roles=[]; decks = await searchDecks(search)}}><i class="bi bi-card-list"></i></button>
    </div>
    <div class="search-results">
        {#if users.length == 0 && search.length == 0}
            <h3 style="margin:0; color:var(--fg-color); opacity:0.7;">Results will appear here...</h3>
        {/if}
        {#each users as user, index}
            {#key user.id}
                <UserRow {user} role={roles[index]} on:delete={async()=>{users = [...users].filter(u => u.id != user.id)}} />
            {/key}
        {/each}
        {#each decks as deck (deck.id)}
            {#key deck.id}
                <DeckRow {deck} />
            {/key}
        {/each}
    </div>
</div>
{/if}


<style>
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
            .wrap-search > input {
                width: 100%;
                height: 3rem;
                border-radius: 0.5rem;
                background-color: var(--bg-color);
                color:var(--fg-color);
                border: 1px solid var(--bg-highlight);
                padding: 0 1rem;
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