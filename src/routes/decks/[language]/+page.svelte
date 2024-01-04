<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import { Deck, decks } from "../testDecks";
    import { goto } from "$app/navigation";
    import { fade, fly, slide } from "svelte/transition";

    let url: string | undefined;
    let targetLang: Deck | undefined;
    let fromLang: Deck | undefined;
    let availableFromLangs: Deck[] = [];
    let changeLangPrompted: boolean = false;
    let selectedFromLang: Deck = [];

    let isNarrowScreen: boolean;

    onMount(async () => {
        if (browser) {
            isNarrowScreen = window.innerWidth <= window.innerHeight;
            fromLang = await JSON.parse(localStorage.getItem('websiteLanguage') || '{}');
            url = await window.location.href.split('/').pop();
            targetLang = await decks.find((deck) => deck.name == url);

            availableFromLangs = await decks.filter(deck => targetLang?.fromLang.some(langId => langId == deck.id) && deck.name != fromLang?.name);
            window.addEventListener("resize", () => {
                isNarrowScreen = window.innerWidth <= window.innerHeight;
            });
        }
    });
    onDestroy(async () => {
        if (browser) {
            window.removeEventListener("resize", () => {
                isNarrowScreen = window.innerWidth <= window.innerHeight;
            });
        }
    });
</script>


<div class="outer-wrap" style="{isNarrowScreen ? "width:100%;" : ""}">
    <div class="target-lang-wrap">
        <span style="font-size: 1.3rem; margin-bottom:1.5rem; font-weight:bold; transform:scaleY(0.95)">TARGET LANGUAGE</span>
        <div class="target-lang">
            <div class="lang-img-wrap">
                <img src={targetLang?.image} alt="{targetLang?.name}"/>
            </div>
            <span style="margin-left: 1rem; font-size:1.75rem; margin-bottom:0.5rem;">{targetLang?.name}</span>
            <button class="change-target-language" on:click={()=>goto("./")}>
                <i class="bi bi-pen-fill"></i>
            </button>
        </div>
    </div>
    <div class="from-lang-wrap">
        <h1 style="margin:0 0 1rem 0;">The course will be taught in:</h1>
        <div class="target-lang">
            <div class="lang-img-wrap">
                <img src={fromLang?.image} alt="{fromLang?.name}"/>
            </div>
            <span style="margin-left: 1rem; font-size:2rem; margin-bottom:0.5rem;">{fromLang?.name}</span>
        </div>
        <h3 style="margin:1rem 0; font-weight:normal; font-size:1.3rem;">The {targetLang?.name} course is also available in:</h3>
        {#each availableFromLangs as deck}
        <div class="from-lang-box" on:click={()=>{changeLangPrompted = true; selectedFromLang=deck}} role="button" tabindex=0 
                                   on:keydown={()=>{changeLangPrompted = true;}}>
            <div class="from-lang-option">
                <img src={deck.image} alt="{deck.name}"/>
            </div>
            <span style="margin-left: 1rem; font-size:1.5rem; margin-bottom:0.5rem;">{deck.name}</span>
        </div>
        {/each}
    </div>
</div>
{#if changeLangPrompted}
<div class="wrap-changelang" style="{isNarrowScreen ? "width:90%;" : ""}"
  in:slide out:fade={{duration:150}}>
    <button class="close" on:click={()=>changeLangPrompted=false}>
        <i class="bi bi-x"></i>
    </button>
    <h2>This requires changing the website's language.</h2>
    <p>Do you want to change the language to {selectedFromLang?.name}?</p>
    <div style="display: flex; flex-direction:row; gap:2rem; margin-top:auto;">
        <button class="option">Yes</button> <button class="option">No</button>
    </div>
</div>
{/if}
<style>
    .option {
        width: 7rem;
        height: 3rem;
        border-radius: 8px;
        border:none;
        font-size: 1.25rem;
        line-height: 3rem;
    }
        .option:first-child {
            background-color:var(--fg-color);
            color: var(--el-bg-color);
        }
        .option:first-child:hover {
            background-color:var(--fg-color-2);
        }
        .option:last-child {
            background-color:var(--el-bg-color);
            color: var(--fg-color);
        }
        .option:last-child:hover {
            background-color:var(--bg-middle);
        }
    .close {
        position:absolute;
        top:1rem;
        right:1rem;
        background:none;
        border:none;
        color:var(--fg-color);
        transition: opacity 0.1s ease-in-out;
    }
        .close:hover {
            opacity: 0.7;
            cursor: pointer;
        }
        .close > i {
            font-size: 2rem;
    }
    .wrap-changelang {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
        background-color:var(--bg-color);
        border-radius:1rem;
        width:30rem;
        height:20rem;
        border: 1px solid var(--bg-highlight);
        box-sizing:border-box;
        padding:2rem;
    }
    .from-lang-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid var(--bg-highlight);
        box-sizing: border-box;
        padding-bottom: 0.5rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
        padding:1rem;
        padding-bottom:0.75rem;
        transition: background-color 0.1s ease-in-out;
    }
        .from-lang-box:hover {
            cursor: pointer;
            background-color: var(--bg-color);
        }
        .from-lang-option {
            width: 4.5rem;
            height: 3rem;
            border-radius: 8px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
            .from-lang-option > img {
                width: 5rem;
                height: 3.5rem;
                object-fit: contain;
        }
    .from-lang-wrap {
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 2rem;
    }
    .change-target-language {
        background:none;
        border:none;
        color:var(--fg-color);
        margin-left: auto;
        transition: opacity 0.1s ease-in-out;
    }
        .change-target-language:hover {
            opacity: 0.7;
            cursor: pointer;
        }
        .change-target-language > i {
            font-size: 2rem;
        }
    .lang-img-wrap {
        width: 5.5rem;
        height: 3.5rem;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .lang-img-wrap > img {
            width: 6rem;
            height: 4rem;
            object-fit: contain;
        }
    .target-lang {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid var(--bg-highlight);
        box-sizing: border-box;
        padding-bottom: 0.5rem;
    }
    .target-lang-wrap {
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        width: 100%;
        height: 27.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding: 2rem;
    }
    .outer-wrap {
        display:flex;
        flex-direction:column;
        width:40rem;
        height:41rem;
        gap:1rem;
    }
</style>