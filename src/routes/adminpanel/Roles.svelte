<script lang="ts">
	import { fade, slide } from 'svelte/transition';
    import type {User} from '$lib/scripts/UserHandler';
    import {getOwnRole, makeAdmin, makeDev, getRole} from '$lib/scripts/UserHandler';
    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    export let user: User;

    let role: string;
    let myRole: string;

    $: canMakeDev = ((myRole == "Admin" || myRole == "SysAdmin") && role == "User");
    $: canMakeAdmin = ((role == "User" || role == "Dev") && myRole == "SysAdmin");

    onMount(async()=>{
        role = await getRole(user.id);
        myRole = await getOwnRole();
        console.log(myRole);
    });
</script>


<div class="overlay" transition:fade>
    <div class="container" transition:slide>
        <div class="top-row">
            <h1>Role of <span>{user.userName}</span></h1>
            <button class="close" on:click={()=>dispatch('close')}><i class="bi bi-x-lg"></i></button>
        </div>
        <div style="display: flex; flex-direction:column; justify-content:space-between; height: 100%;">
            <p style="font-size: 2rem; color:var(--cyan)">{role}</p>
            <button class="role-btn" class:disabled={!canMakeDev} on:click={async()=>{
                if (canMakeDev) {
                    await makeDev(user.id);
                    location.reload();
                }
            }}>Make Dev</button>
            <button class="role-btn" class:disabled={!canMakeAdmin} on:click={async()=>{
                if (canMakeAdmin) {
                    await makeAdmin(user.id);
                    location.reload();
                }
            }}>Make Admin</button>
        </div>
    </div>
</div>


<style>
    .role-btn {
        background-color: var(--bg-highlight);
        color: var(--fg-color);
        border-radius: 0.5rem;
        border:none;
        padding: 0.5rem;
        font-size: 1.2rem;
        transition: all 0.1s ease-in-out;
        height:3rem;
    }
        .disabled {
            opacity: 0.5 !important;
            cursor: not-allowed !important;
            pointer-events: none;
        }
        .role-btn:hover {
            background-color: var(--bg-highlight-2);
            cursor: pointer;
        }   
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        padding: 2rem;
        width: 30rem;
        height: 20rem;
        display: flex;
        flex-direction: column;
    }
        .container > .top-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--bg-highlight);
        }
            .container > .top-row > .close {
                background-color: #00000000;
                color: var(--fg-color-2);
                border-radius: 999px;
                border:none;
                display: flex;
                justify-content: center;
                align-items: center;
                height:3rem;
                width:3rem;
                font-size: 1.5rem;
                padding-top: 0.2rem;
                transition: all 0.1s ease-in-out;
            }
                .container > .top-row > .close:hover {
                    background-color: var(--red);
                    color: white;
                    cursor: pointer;
                }
    * {
        box-sizing: border-box;
        margin:0;
    }
</style>