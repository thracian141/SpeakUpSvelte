<script lang="ts">
    import { onMount } from "svelte";
    import {Deck, decks}  from "./testDecks";
    import { browser } from "$app/environment";
    import { fly } from "svelte/transition";
    
    let isNarrowScreen = window.innerWidth <= window.innerHeight;;
    onMount(() => {
        window.addEventListener("resize", () => {
            isNarrowScreen = window.innerWidth <= window.innerHeight;
        });
    });

    let anyLangHovered = false;
    let langHoveredId = -1;
    let anyLangSelected = false;
    let selectedLangId = -1;

    function selectLang(id: number) {
        if (selectedLangId != id) {
            selectedLangId = id;
            anyLangSelected = true;
        } else {
            selectedLangId = -1;
            anyLangSelected = false;
        }
    }
</script>


<div class="outer-wrap" style="{isNarrowScreen ? "width:100%; flex-wrap:wrap; height:100%; padding-top:15%;" : ""}">
    <div class="wrap-top">
        <h1 style="margin-bottom: 1rem;">What language do you want to learn?</h1>
        <h1 style="color: var(--fg-color-2); font-size:1.8rem; font-weight:normal;">Choose a language</h1>
    </div>
    <div class="languages">
        {#each decks as deck, index}
        <div class="deck" id={String(index)} class:this-hovered={langHoveredId==index || selectedLangId==index} class:any-hovered={anyLangSelected || anyLangHovered}
                                            on:mouseenter={()=>{anyLangHovered=true; langHoveredId=index}} 
                                            on:mouseleave={()=>{anyLangHovered=false; langHoveredId=-1}}
                                            on:click={()=>selectLang(index)}   class:selected={selectedLangId==index}
                                            on:keydown={()=>selectLang(index)}
                                            role="checkbox" aria-checked={false} tabindex={index}
                                            style="{isNarrowScreen ? "width:100%;" : ""}">
            {#if deck.image != null}
            <div class="img-wrap">
                <img src={deck.image} alt="{deck.name} deck" />
            </div>
            {/if}
            <span>{deck.name}</span>
        </div>
        {/each}
    </div>
    {#if anyLangSelected}
        <button class="select-button" in:fly={{x:-2000}} out:fly={{x:2000}}>
            Learn {decks[selectedLangId].name}
        </button>
    {:else}
        <div class="wrap-bottom" in:fly={{x:-2000}} out:fly={{x:2000}}>
            <h1 style="color: var(--fg-color-2); font-size:1.8rem; font-weight:normal;">You haven't started any course yet.</h1>
        </div>
    {/if}
</div>


<style>
    .select-button {
        background-color: var(--fg-color);
        color: var(--el-bg-color);
        font-size: 1.5rem;
        width: 12rem;
        height:4rem;
        border:none;
        border-radius: 1rem;
        margin-left: 2rem;
        box-shadow: 0 0 10px 3px var(--selected-color);
    }
        .select-button:hover {

        }
    .wrap-bottom {
        display:flex;
        flex-direction:column;
        align-items: left;
        width:100%;
        box-sizing: border-box;
        padding-left: 2rem;
        padding-top:2rem;
        margin-bottom: 2rem;
    }
    .languages {
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content: left;
        width:100%;
        padding: 1rem 2rem;
        box-sizing: border-box;
    }
    .wrap-top {
        display:flex;
        flex-direction:column;
        align-items: left;
        width:100%;
        box-sizing: border-box;
        padding-left: 2rem;
        padding-top:2rem;
        margin-bottom: 2rem;
    }
        .wrap-top > h1 {
            margin:0;
            padding:0;
        }
    .deck {
        position: relative;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-start;
        border: 2px solid var(--bg-highlight);
        border-radius: 1.2rem;
        width:13rem;
        height:5rem;
        box-sizing: border-box;
        padding: 1rem;
        margin-right: 2rem;
        margin-bottom: 2rem;
        transition: all 0.15s ease-in-out;
    }
        .selected {
            background-color: var(--bg-color);
        }
        .any-hovered {
            cursor:pointer;
            border: 2px solid var(--bg-color);
            color: var(--fg-color-2);
        }
        .this-hovered {
            cursor:pointer;
            border: 2px solid var(--bg-highlight) !important;
            color: var(--fg-color) !important;
            box-shadow: 0 0 4px 2px var(--bg-color) !important;
        }
        .deck > span {
            font-size: 1.2rem;
            box-sizing: border-box;
            width: 5rem;
            text-align: center;
            margin-left: 1rem;
        }
        .img-wrap {
            width:4.5rem;
            height:3rem;
            border-radius: 12px;
            overflow:hidden;
            display: flex;
            align-items:center;
            justify-content:center;
            border: 2px solid var(--bg-color);
        }
        .img-wrap img {
            width:5rem;
            height:3.5rem;
            object-fit:contain;
            border-radius: 10px;
            image-rendering: crisp-edges;
            object-position: center;
        }
    .outer-wrap {
        display:flex;
        flex-direction:column;
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        width:60rem;
        height:35rem;
        padding: 1rem;
    }
</style>