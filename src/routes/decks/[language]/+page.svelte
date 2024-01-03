<script lang="ts">
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import { Deck, decks } from "../testDecks";
    import { goto } from "$app/navigation";

    let url: string | undefined;
    let targetLang: Deck | undefined;
    let fromLang: Deck | undefined;

    let isNarrowScreen: boolean;

    onMount(async () => {
        if (browser) {
            isNarrowScreen = window.innerWidth <= window.innerHeight;
            fromLang = await JSON.parse(localStorage.getItem('websiteLanguage') || '{}');
            url = await window.location.href.split('/').pop();
            targetLang = await decks.find((deck) => deck.name == url);

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


<div class="outer-wrap" >
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
    </div>
</div>


<style>
    .from-lang-wrap {
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 2rem;
    }
    .change-target-language {
        background:none;
        border:none;
        color:var(--cyan);
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