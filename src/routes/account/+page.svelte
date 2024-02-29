<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import Statistics from "./Statistics.svelte";
    import {_} from "$lib/i18n";
    import { isNarrowScreen } from "$lib/store";

    let src = "/zdravkoqnkov.jpg"
    let username = "Shefa"
    let displayname = "John Doe"
    let email = "email@gmail.com"
    let accountCreatedDate = "12.09.2013"
    
    let editEnabled = false;
    let currentEdit = "";
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
</script>

<div class="wrap" style="{$isNarrowScreen ? "width:100vw; max-width:100vw; padding:0; padding-top:4.75rem;": ""}">
    <div class="panel" style="{$isNarrowScreen ? "border-radius: 0 !important; height:35rem;" : ""}">
        <div class="fields" style="{$isNarrowScreen ? "padding-bottom:0;" : ""}">
            <div class="top-row">
                <a href="/" class="pfp-wrap" on:click={(e) => {e.preventDefault();alert(`You've been banned for trying to change the default picture.`)}}>
                    <img {src} alt="pfp" class="pfp" />
                    <div class="pfp-overlay">{$_('account.change_photo')}</div>
                </a>
                <div class="username-and-date" style="{$isNarrowScreen ? "left:110%;" : ""}">
                    <h1 style="margin:0; margin-bottom:2.5rem; {$isNarrowScreen ? "margin-left:1.25rem; height:2rem;": ""}">{username}</h1>
                    <div style="display: flex;flex-direction:row;align-items:center; text-align:center">
                        <img src="/icons/calendar-event.svg" alt="account created" style="{$isNarrowScreen ? "margin-right:0.3rem; height:1.6rem;":""}"/>
                        <div style="display: flex; {$isNarrowScreen ? "flex-direction:column-reverse; position:relative;" : "flex-direction:column;"} width:10rem; align-items:flex-start">
                            <span style="font-weight: bold; font-size:0.85rem; {$isNarrowScreen ? "font-size: 0.9rem; position:absolute; top:125%; right:29.5%; width:100%;" : "padding-left:0.2rem"}">{$_('account.account_created')}</span>
                            <span style="{$isNarrowScreen ? "font-size: 1.2rem;" : "font-size: 1.5rem;"}">{accountCreatedDate}</span>
                        </div>
                    </div>
                </div>
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
                    <p>{displayname}</p>
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
            <div class="edit-fields">
                <div class="edit-row" in:slide>
                    <span style="margin-bottom:0.5rem">{currentEdit.toUpperCase()} 
                        <span style="color:red; font-weight:normal; margin-left:0.5rem;">{error}</span>
                    </span>
                    {#if currentEdit == "email"}
                        <input type="email" autocomplete="off" style="width:97.5%;" bind:value={editInput}/>
                    {:else if currentEdit == "password"}
                        <input type="password" autocomplete="off" style="width:97.5%;" bind:value={editInput}/>
                    {:else}
                        <input type="text" autocomplete="off" style="width:97.5%;" bind:value={editInput}/>
                    {/if}
                </div>
                <div class="edit-row" in:slide style="margin-bottom: auto !important;">
                    <span style="margin-bottom:0.5rem">CURRENT PASSWORD</span>
                    <input type="password" autocomplete="off" style="width:97.5%;"/>
                </div>
            </div>
        </div>
        <div class="edit-bottom" style="{$isNarrowScreen ? "width:100%; border-radius:0;" : ""}">
            <button class="cancel-button" on:click={(e) => {e.preventDefault(); editEnabled=false;}}>
                Cancel
            </button>
            <button class="confirm-button">
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
    .username-and-date {
        display: flex;
        flex-direction: column;
        position: absolute;
        left:120%;
        top:15%;
    }
        .username-and-date > div > img {
            filter: brightness(0) saturate(100%) invert(92%) sepia(3%) saturate(1186%) hue-rotate(193deg) brightness(84%) contrast(88%);
            height:3rem;
            font-size: 1.2rem;
            margin-right: 1rem;
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
        padding-top: 8rem;
        padding-bottom: 2rem;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .top-row {
        position: absolute;
        top:0%;
        transform: translateY(-50%);
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: top;
        gap:2rem;
    }
    .pfp-wrap {
        width:10rem;
        height:10rem;
        border-radius: 100%;
        display: flex;
        overflow: hidden;
        outline: 0.5rem solid var(--bg-color);
        position: relative;
        margin-left: 0.35rem;
    }
        .pfp-wrap:hover .pfp-overlay {
            cursor: pointer;
            opacity: 1;
        }
    .pfp {
        object-fit:fill;
    }
    .pfp-overlay {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00000070;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
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
</style>