<script lang="ts">
	import { slide } from 'svelte/transition';
    import { isNarrowScreen } from '$lib/store';
    import type { DeckInputModel } from '$lib/scripts/models/inputModels';
    import { deckStore } from './deckStore';
    import { goto } from '$app/navigation';
    import {_} from '$lib/i18n';
    import { createDeck, type DeckInput } from '$lib/scripts/DeckHandler';

    let deckName = '';
    let deckDescription = '';

    let isRotating = false;

    function rotateIcon() {
        isRotating = true;
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    }
    function resetValues() {
        deckName = '';
        deckDescription = '';
    }

    async function handleSubmit(e: Event) {
        await e.preventDefault();

        const deck: DeckInputModel = {
            name: deckName,
            description: deckDescription
        };
        const deckModel: DeckInput = { //this is the real one
            deckName: deckName,
            deckDescription: deckDescription
        }
        const createdDeckId = await createDeck(deckModel);

        await deckStore.set(deck);

        goto(`/create/deck/${createdDeckId}`);
    }
</script>

<h1 transition:slide>{$_('create.deck.create_a_personal_deck')}</h1>
<form enctype="multipart/form-data" transition:slide style="{$isNarrowScreen ? '' : 'padding:2rem;width:40rem;border:1px solid var(--bg-highlight); border-radius:0.75rem;'}">
    <div class="inner-wrap" style="{$isNarrowScreen ? 'flex-direction:column;' : ''}">
        <div class="fields-wrap">
            <div class="field-group">
                <label for="name" style="{deckName != '' ? "top:0%;opacity: 0.75;font-size: 1rem;" : ""}">{$_('create.deck.deck_name')}</label>
                <input id="name" type="text" name="name" bind:value={deckName} autocomplete="off">
            </div>
            <div class="field-group" style="margin-top: 1rem;">
                <label for="description" style="{deckDescription!='' ? 'top:-8%;opacity: 0.75;font-size: 1rem;' : ""}">
                    {deckDescription!='' ? $_('create.deck.description') : $_('create.deck.description')+"..."}
                </label>
                <textarea id="description" name="description" bind:value={deckDescription} autocomplete="off"></textarea>
            </div>
        </div>
    </div>
    <div class="buttons" style="{$isNarrowScreen ? 'width:100%;' : ''}">
        <button type="submit" on:click={async(e)=>{await handleSubmit(e);}}>{$_('create.deck.create')}</button>
        <button type="reset" on:click={()=>{rotateIcon(); resetValues()}}>
            <div class="{isRotating ? 'rotate' : ''}">
                <i class="bi bi-arrow-counterclockwise"></i>
            </div>
        </button>
    </div>
</form>

<style>
    .buttons {
        width:20rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .rotate {
        animation: rotate 0.5s cubic-bezier(0.68, -0.55, 0.27, 1);
    }

    @keyframes rotate {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    button[type="reset"] {
        width:3rem;
        height:3rem;
        border-radius: 0.5rem;
        background-color: var(--red);
        border: none;
        color: #fff;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.12s ease-in-out;
    }
        button[type="reset"]:hover {
            opacity: 0.9;
        }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap:1rem;
    }
    form > .inner-wrap {
        gap:2rem;
    }
    button[type="submit"] {
        width:15rem;
        height:3rem;
        border-radius: 0.5rem;
        background-color: var(--fg-color);
        border: none;
        color: var(--el-bg-color);
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.12s ease-in-out;
    }
        button[type="submit"]:hover {
            background-color: var(--fg-color-2);
            color: var(--bg-color);
        }
    textarea, textarea:focus, textarea:active, textarea:hover { 
        resize: none;
        width: 30rem;
        height: 10.25rem;
        background-color: var(--bg-color) !important;
        color: var(--fg-color) !important;
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box !important;
        box-shadow: none !important;
        outline: none !important;
        -webkit-box-shadow: none !important;
        -webkit-border: none !important;
        -moz-box-shadow: none !important;
        -moz-border: none !important;
        border:1px solid var(--bg-highlight) !important;
        font-size: 1.3rem;
        transition: border 0.12s ease-in-out;
    }
        textarea:hover {
            border: 1px solid var(--fg-color-half) !important;
        }
        label[for="description"] {
            font-size: 1.1rem;
            margin-left:0.5rem;
            position: absolute;
            top:0.5rem;
            opacity: 1;
            transition: top 0.2s ease-in-out, opacity 0.3s ease-in-out, font-size 0.12s ease-in-out;
        }
            .field-group:focus-within > label[for="description"] {
                top:-8%;
                opacity: 0.75;
                font-size: 1rem;
            }
    .field-group {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.25rem;
    }
    input[type="text"], input[type="text"]:focus, input[type="text"]:active, input[type="text"]:hover {
        background-color: var(--bg-color) !important;
        color: var(--fg-color) !important;
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box !important;
        border:none !important;
        box-shadow: none !important;
        outline: none !important;
        -webkit-box-shadow: none !important;
        -webkit-border: none !important;
        -moz-box-shadow: none !important;
        -moz-border: none !important;
        border: 1px solid var(--bg-highlight) !important;
        height:3.5rem;
        font-size: 1.5rem;
        transition: border 0.12s ease-in-out;
    }
        input[type="text"]:hover {
            border: 1px solid var(--fg-color-half) !important;
        }
        label[for="name"] {
            position: absolute;
            z-index: 1;
            top:50%;
            margin-left:0.5rem;
            transform: translateY(-50%);
            opacity: 1;
            font-size: 1.1rem;
            transition: top 0.2s ease-in-out, opacity 0.3s ease-in-out;
            color: var(--fg-color);
        }
            .field-group:focus-within > label[for="name"] {
                top:0%;
                opacity: 0.75;
                font-size: 1rem;
            }
    .inner-wrap {
        display: flex;
        flex-direction: row;
    }
    .fields-wrap {
        display: flex;
        flex-direction: column;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    @media (pointer: coarse) {
        h1 {
            font-size: 1.5rem;
        }
        form {
            overflow-x: hidden;
        }
            .inner-wrap {
                width: 100%;
            }
            #name {
                width: 100%;
            }
            #description {
                width: 100%;
            }
    }
</style>