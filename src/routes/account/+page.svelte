<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import Statistics from "./Statistics.svelte";
    import {_} from "$lib/i18n";
    import { isNarrowScreen } from "$lib/store";
    import type {User} from "$lib/scripts/UserHandler";
    import {getUser, editDisplayName, editEmail, editPassword, editUsername} from '$lib/scripts/UserHandler';
    import { onMount } from "svelte";

    let username = ""
    let displayname = ""
    let email = ""
    let accountCreatedDate = new Date();

    let user:User|undefined = undefined;
    let editEnabled = false;
    let currentEdit = "";
    let currentPassword = "";
    function handleEditClick(e : Event, button : string) {
        e.preventDefault();
        editEnabled = true;
        currentEdit = button;
        window.addEventListener('click', handleWindowClick);
    }
    function handleWindowClick(e : Event) {
        if (e.target === document.querySelector('.edit-overlay')) {
            editEnabled = false;
            window.removeEventListener('click', handleWindowClick);
        }
    }

    let editInput = '';

    let error = "";
    $: {
        if (currentEdit != "email" && currentEdit != "password") {
            error = "";
        } else if (currentEdit === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(editInput)) {
                error = "An email must contain an '@' symbol, and a domain.";
            } else {
                error = "";
            }
        } else if (currentEdit === "password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(editInput)) {
                error = "A password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number.";
            } else {
                error = "";
            }
        }
    }
    onMount(async () => {
        user = await getUser();
        if (user) {
            username = user.userName;
            displayname = user.displayName;
            email = user.email;
            accountCreatedDate = user.accountCreatedDate;
        }
    });

    async function handleSubmitEdit() {
        if (currentEdit === "username") {
            username = await editUsername(currentPassword, editInput);
        } else if (currentEdit === "display name") {
            displayname = await editDisplayName(currentPassword, editInput);
        } else if (currentEdit === "email") {
            email = await editEmail(currentPassword, editInput);
        } else if (currentEdit === "password") {
            await editPassword(currentPassword, editInput);
        }
        editEnabled = false;
    }
</script>

<div class="wrap" style="{$isNarrowScreen ? "width:100vw; max-width:100vw; padding:0; padding-top:4.75rem;": ""}">
    <div class="panel" style="{$isNarrowScreen ? "border-radius: 0 !important; height:35rem;" : ""}">
        {#if user != undefined}
        <div class="fields" style="{$isNarrowScreen ? "padding-bottom:0;" : "height:100%;"}" transition:slide>
            <div class="row">
                <div class="user-field">
                    <span>{$_('account.account_created')}</span>
                    <p>{accountCreatedDate}</p>
                </div>
                <i class="bi bi-calendar2-event" style="font-size: 2.5rem; margin-right:0.75rem;"></i>
            </div>
            <div class="row">
                <div class="user-field">
                    <span>{$_('account.username')}</span>
                    <p>{username}</p>
                </div>
                <button class="edit-button" on:click={(e) => handleEditClick(e, 'username')}>{$_('account.edit')}</button>
            </div>
            <div class="row">
                <div class="user-field">
                    <span>{$_('account.display_name')}</span>
                    <p>{displayname == null ? "" : displayname}</p>
                </div>
                <button class="edit-button" on:click={(e) => handleEditClick(e, 'display name')}>{$_('account.edit')}</button>
            </div>
            <div class="row">
                <div class="user-field">
                    <span>{$_('account.email')}</span>
                    <p>{email}</p>
                </div>
                <button class="edit-button" on:click={(e) => handleEditClick(e, 'email')}>{$_('account.edit')}</button>
            </div>
            <div class="row">
                <div class="user-field">
                    <span>{$_('account.password')}</span>
                    <p style="font-size: 1.2rem; color:var(--fg-color-2)">{$_('account.use_a_secure_password')}</p>
                </div>
                <button class="edit-button" on:click={(e) => handleEditClick(e, 'password')}>{$_('account.edit')}</button>
            </div>
        </div>
        {/if}
    </div>
    <Statistics />
</div>
{#if editEnabled}
    <div class="edit-overlay" in:fade={{duration:200}} out:fade={{duration:100}}>
        <div class="edit-wrap" style="{$isNarrowScreen ? "width:100%; border-radius:0; align-items:flex-start; height:23rem; padding-bottom:1rem" : ""}">
            <a href="/" style="font-size:2rem; position:absolute; right:5%; top:5%;" 
            on:click={(e) => {e.preventDefault(); editEnabled=false;}}><img src="/icons/x-lg.svg" alt="close"></a>
            <h1 style="margin-bottom:0.5rem; {$isNarrowScreen ? "font-size:1.4rem;" : "font-size:1.8rem;"}">Change your {currentEdit} </h1>
            <p style="color: var(--fg-color-2); font-size:1.1rem; margin-bottom:{currentEdit=="password" ? "1rem" : "2rem"};">Enter a new {currentEdit} and your current password.</p>
            <form class="edit-fields" autocomplete="off">
                <div class="edit-row" in:slide>
                    <span style="margin-bottom:0.5rem">{currentEdit.toUpperCase()} 
                        <span style="color:red; font-weight:normal; margin-left:0.5rem;">{error}</span>
                    </span>
                    {#if currentEdit == "email"}
                        <input type="email" id="email" name="email" autocomplete="organization-title" placeholder="" style="width:97.5%;" bind:value={editInput}/>
                    {:else if currentEdit == "password"}
                        <input type="password" id="password" name="password" autocomplete="organization-title" style="width:97.5%;" bind:value={editInput}/>
                    {:else}
                        <input type="text" id="name" name="name" autocomplete="organization-title" style="width:97.5%;" bind:value={editInput}/>
                    {/if}
                </div>
                <div class="edit-row" in:slide style="margin-bottom: auto !important;">
                    <span style="margin-bottom:0.5rem">CURRENT PASSWORD</span>
                    <input type="password" autocomplete="organization-title" style="width:97.5%;" bind:value={currentPassword}/>
                </div>
            </form>
        </div>
        <div class="edit-bottom" style="{$isNarrowScreen ? "width:100%; border-radius:0;" : ""}">
            <button class="cancel-button" on:click={(e) => {e.preventDefault(); editEnabled=false;}}>
                Cancel
            </button>
            <button class="confirm-button" on:click={async()=>{await handleSubmitEdit()}}>
                Confirm
            </button>
        </div>
    </div>
{/if}

<style>
    .cancel-button {
        background-color: #00000000;
        color: var(--fg-color);
        border: none;
        width:6rem;
        height:3.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
    }
        .cancel-button:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    .confirm-button {
        background-color: var(--bg-color);
        color: var(--fg-color);
        border: none;
        width:6rem;
        height:3.5rem;
        font-size: 1.1rem;
        font-weight: bold;
        text-align: center;
        border-radius: 0.25rem;
        transition: background-color 0.05s ease-in-out, color 0.05s ease-in-out;
    }
    .confirm-button:hover {
        background-color: var(--bg-middle);
        cursor: pointer;
        color: var(--fg-color-2);
    }
    .edit-wrap > a > img {
        filter: brightness(0) saturate(100%) invert(55%) sepia(9%) saturate(784%) hue-rotate(190deg) brightness(100%) contrast(98%);
        height:1.75rem;
    }
    .edit-wrap > a > img:hover {
        cursor: pointer;
        filter: brightness(0) saturate(100%) invert(92%) sepia(3%) saturate(1364%) hue-rotate(193deg) brightness(85%) contrast(86%);
    }
    .edit-bottom {
        background-color: var(--el-bg-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:35rem;
        height:7.5rem;
        border-radius: 0 0 0.6rem 0.6rem;
        padding: 2rem;
        box-sizing: border-box;
        justify-content: flex-end;
    }
    .edit-button {
        background-color: var(--el-bg-color);
        width:100%;
        height:20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .edit-row > span {
        font-size: 1rem;
        font-weight: bold;
        transform: scaleY(0.4);
        color: var(--fg-color);
    }
    .edit-row > input, .edit-row > input::placeholder {
        background-color: var(--el-bg-color);
        outline: none !important;
        border: none !important;
        box-shadow: inset 0 0 0 999px var(--el-bg-color) !important;
        color: var(--fg-color);
        height:3rem;
        font-size: 1.3rem;
        border-radius: 0.3rem;
        margin-top: 0.5rem;
    }
    .edit-fields {
        display: flex;
        flex-direction: column;
        gap:1rem;
        width:100%;
        height:100%;
    }
    .edit-wrap > h1, p {
        margin:0;
    }
    .edit-wrap {
        position: relative;
        background-color: var(--bg-color);
        width:35rem;
        height:21rem;
        border-radius: 0.6rem 0.6rem 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 1.5rem;
    }
    .edit-overlay {
        position: fixed;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        background-color: #000000a0;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .user-field {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .user-field > span {
        font-size: 1rem;
        font-weight: bold;
        transform: scaleY(0.9);
    }
    .user-field > p {
        font-size: 1.4rem;
        margin: 0;
    }
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        box-sizing: border-box;
        padding: 0 1rem;
    }
    .edit-button {
        background-color: var(--bg-highlight);
        color: var(--fg-color);
        border: none;
        width:4.5rem;
        height:2.5rem;
        font-size: 1.3rem;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
    }
        .edit-button:hover {
            background-color: var(--bg-highlight-2);
            color: white;
        }
    .fields {
        position: relative;
        background-color: var(--bg-color);
        border-radius: 0.7rem;
        width:100%;
        height:85%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        padding-top: 3rem;
        padding-bottom: 4rem;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .panel {
        background-color: var(--el-bg-color);
        width:35rem;
        height:42rem;
        border-radius: 0.7rem;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .wrap {
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        min-width: 50vw;
        max-width: 70vw;
        flex-direction: row;
        flex-wrap:wrap;
        gap:1rem;
        justify-content: center;
        align-items: center;
    }
    * {
        box-sizing: border-box;
    }
</style>