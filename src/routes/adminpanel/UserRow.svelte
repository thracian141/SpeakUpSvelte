<script lang="ts">
	import Roles from './Roles.svelte';
	import { slide } from 'svelte/transition';
    import type {User} from '$lib/scripts/UserHandler';
    import {deleteAccount, amHigherRole} from '$lib/scripts/UserHandler';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    async function handleDelete() {
        await deleteAccount(user.id);
        dispatch('delete', user.id);
    }

    export let role: string;
    export let user: User;
    let iAmHigherRole = false;
    let rolesOpen = false;

    onMount(async()=>{
        iAmHigherRole = await amHigherRole(user.id);
    });
</script>


<div class="user-row" transition:slide>
    <div class="info">
        <h3><span>{user.userName}</span> - <span>{user.displayName}</span></h3>
        <p>{user.email}</p>
    </div>
    <div class="buttons">
        
            {#if role=='Dev'}
                <i class="bi bi-pencil-square" style="font-size: 2.4rem; margin-right:1.5rem; position:relative; margin-top:-0.9rem; color:var(--cyan)">
                    <span style="font-size:0.9rem; position:absolute; bottom:-0.75rem; left:50%; transform:translateX(-55%); color:var(--fg-color)">Dev</span>
                </i>
            {:else if role=='Admin'}
                <i class="bi bi-tools" style="font-size: 2.4rem; margin-right:1.5rem; position:relative; margin-top:-0.9rem; color:var(--selected-text)">
                    <span style="font-size:0.9rem; position:absolute; bottom:-1rem; left:50%; transform:translateX(-50%); color:var(--fg-color)">Admin</span>
                </i>
            {/if}
        {#if iAmHigherRole}
            <button style="background-color: var(--bg-highlight); color: var(--fg-color);" on:click={()=>rolesOpen = !rolesOpen}>Roles</button>
            <button style="background-color:var(--red); color:white;" on:click={async()=>{await handleDelete()}}>Delete</button>
        {/if}
    </div>
</div>
{#if rolesOpen}
    <Roles {user} on:close={()=>rolesOpen=false}/>
{/if}


<style>
    .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        gap:0.5rem;
        border-radius: 0.5rem;
    }
        .buttons > button {
            height: 3.5rem;
            border: 1px solid var(--bg-highlight-2);
            border-radius: 0.5rem;
            width: 4rem;
            font-size: 1.1rem;
        }
        .buttons > button:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    .user-row {
        background-color: var(--bg-middle);
        padding: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid var(--bg-color-2);
        align-items: center;
        border-radius: 0.5rem;
        width: 100%;
        height:6rem;
        margin-bottom: 0.75rem;
    }

    * {
        box-sizing: border-box;
    }
</style>