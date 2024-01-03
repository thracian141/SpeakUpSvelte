<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Deck, decks }  from "./testDecks";
    import { browser } from "$app/environment";
    import { fade } from "svelte/transition";
    import { goto } from "$app/navigation";
    
    let isNarrowScreen: boolean;
    let fromLang: Deck | undefined;
    let decksFiltered: Deck[] = [];
    onMount(async () => {
        if (browser) {
            isNarrowScreen = window.innerWidth <= window.innerHeight;
            fromLang = await JSON.parse(localStorage.getItem("websiteLanguage") || "{}");
            decksFiltered = await decks.filter((deck) => deck.name != fromLang?.name);
            window.addEventListener("resize", () => {
                isNarrowScreen = window.innerWidth <= window.innerHeight;
            });
        }
    });
    onDestroy(async() => {
        if (browser) {
            window.removeEventListener("resize", () => {
                isNarrowScreen = window.innerWidth <= window.innerHeight;
            });
        }
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
        {#each decksFiltered as deck, index}
        <div class="deck" id={String(deck.id)} class:this-hovered={langHoveredId==deck.id || selectedLangId==deck.id} class:any-hovered={anyLangSelected || anyLangHovered}
                                            on:mouseenter={()=>{anyLangHovered=true; langHoveredId=deck.id}} 
                                            on:mouseleave={()=>{anyLangHovered=false; langHoveredId=-1}}
                                            on:click={()=>selectLang(deck.id)}   class:selected={selectedLangId==deck.id}
                                            on:keydown={()=>selectLang(deck.id)}
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
    <div class="wrap-bottom">
        {#if anyLangSelected}
            <button class="select-button" in:fade on:click={()=>goto(`/decks/${decks[selectedLangId].name}`)}>
                Learn {decks[selectedLangId].name}
            </button>
        {:else}
            <h1 in:fade style="color: var(--fg-color-2); font-size:1.8rem; font-weight:normal; margin:0;">You haven't started any course yet.</h1>
        {/if}
    </div>
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
        box-shadow: none;
        transition: all 0.2s ease-in-out, box-shadow 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
        .select-button:hover {
            cursor:pointer;
            opacity: 0.9;
            color: var(--el-bg-color);
            box-shadow: 0 0 12px 2px var(--selected-color);
        }
    .wrap-bottom {
        display:flex;
        flex-direction:column;
        align-items: left;
        width:100%;
        height: 6rem;
        box-sizing: border-box;
        padding-left: 2rem;
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