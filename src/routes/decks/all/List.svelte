<script lang="ts">
    import { slide } from 'svelte/transition';
    import { onMount } from 'svelte';
    import {_} from '$lib/i18n';
	import { isNarrowScreen } from '$lib/store';
    import {setActiveDeck, getDecksList} from '$lib/scripts/DeckHandler';
    import type {Deck} from '$lib/scripts/DeckHandler';
    import type { Course } from '$lib/scripts/CourseHandler';
    import {listActiveCourses} from '$lib/scripts/CourseHandler';
    import {changeActiveCourse} from '$lib/scripts/CourseHandler';
    import Edit from './Edit.svelte';
    import Delete from './Delete.svelte';

    let activeDropdown: any = null;
    let editorOpen = false;
    let editingDeck: Deck|null = null;
    let editingDeckIndex: number|null = null;
    let deleteOpen = false;
    let deletingDeckName: string|null = null;
    let deletingDeckIndex: number|null = null;
    let deletingDeckId: number|null = null;
    let searchbarInput = '';

    let decksList:Deck[] = [];
    let coursesList: Course[] = [];

    let filteredDecks: Deck[] = [];
    let filteredCourses: Course[] = [];

    onMount(async () => {
        decksList = await getDecksList();
        coursesList = await listActiveCourses();
    });

    function closeEditor() {
        editorOpen = false;
        editingDeck = null;
        editingDeckIndex = null;
    }
    async function handleEdit(event: CustomEvent<Deck>) {
        if (editingDeckIndex == null) return;
        decksList[editingDeckIndex] = event.detail;
        closeEditor();
    }
    function closeDelete() {
        deleteOpen = false;
        deletingDeckName = null;
        deletingDeckIndex = null;
        deletingDeckId = null;
    }
    async function handleDelete(event: CustomEvent<number>) {
        if (deletingDeckIndex == null) return;
        decksList = await decksList.filter(deck => deck.id != deletingDeckId);
        closeDelete();
    }

    $: {
        filteredDecks = decksList.filter(deck => deck.deckName.toLowerCase().includes(searchbarInput.toLowerCase()));
        filteredCourses = coursesList.filter(course => course.title.toLowerCase().includes(searchbarInput.toLowerCase()));
    }
</script>


<input type="text" placeholder="{$_('decks.all.search')}" class="searchbar" bind:value={searchbarInput} transition:slide/>
<div class="bottom-wrap" style="{$isNarrowScreen ? 'flex-direction: column;' : 'flex-direction:row; height: 26rem;'}" transition:slide>
    <!-- COURSES -->
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:35vh !important;' : 'width:34rem; height: 100%;'}">
        <h2>{$_('decks.all.your_active_courses')}</h2>
        {#if coursesList.length > 0}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            {#each filteredCourses as course}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="course-wrap" transition:slide on:click={async()=>{await changeActiveCourse(course.courseCode)}}>
                    <button on:click|stopPropagation={()=>{
                        if (activeDropdown==course.courseCode){activeDropdown=null} else{activeDropdown=course.courseCode}}}>
                        <i class="bi bi-gear-fill"></i>
                        <div class="options-dropdown" class:dropped={activeDropdown==course.courseCode}>
                            a
                        </div>
                    </button>
                    <img src="{course.image}" alt="{course.courseCode}" />
                    <span style="margin-right: 1rem;">{course.title}</span>
                    <p>78%</p>
                    <div class="overlay">
                        {$_('decks.language.learn')}
                    </div>
                </div>
            {/each}
            {#if coursesList.length !== 5}
                <a href="/decks" class="add-course">
                    + <span>{$_('decks.all.switch_active_course')}</span>
                </a>
            {/if}
        {/if}
    </div>
    <div class="separator-line"  transition:slide style="{$isNarrowScreen ? 
        'width:100%; height:1px; flex-direction: row; margin: 1.5rem 0;' : 
        'width:1px; height:100%; flex-direction: column; margin: 0 1.5rem;'}">
    </div>
    <!-- DECKS -->
    <div class="courses" style="{$isNarrowScreen ? 'width:100%; height:50vh;' : 'width:34rem; height: 100%;'}">
        <h2>{$_('decks.all.your_personal_decks')}</h2>
        {#if decksList.length !== 0}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#each filteredDecks as deck, index (deck.deckName)}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={async()=>{await setActiveDeck(deck.id)}} class="course-wrap" style="height:6rem;" transition:slide>
                <button on:click|stopPropagation={()=>{if(activeDropdown==deck.id){activeDropdown=null} else{activeDropdown=deck.id}}}>
                    <i class="bi bi-gear-fill"></i>
                    <div class="options-dropdown" class:dropped={activeDropdown==deck.id}>
                        <a href="/create/deck/{deck.id}">Cards</a>
                        <button on:click={() => {editorOpen=!editorOpen; editingDeck=deck, editingDeckIndex = index}}>Edit</button>
                        <button on:click={() => {deleteOpen=!deleteOpen; deletingDeckName=deck.deckName; deletingDeckIndex = index, deletingDeckId=deck.id}}>Delete</button>
                    </div>
                </button>
                <span style="font-size: 1.8rem;">{deck.deckName}</span>
                <p style="font-size: 1rem;">{deck.level}%</p>
                <div class="overlay">
                    {$_('decks.language.learn')}
                </div>
            </div>
        {/each}
        {/if}
    </div>
    {#if editorOpen && editingDeck != null && editingDeckIndex != null}
        <Edit deck={editingDeck} index={editingDeckIndex} on:close={closeEditor} on:edit={handleEdit}/>
    {/if}
    {#if deleteOpen && deletingDeckName != null && deletingDeckIndex != null && deletingDeckId != null}
        <Delete deckName={deletingDeckName} index={deletingDeckIndex} id={deletingDeckId} on:close={closeDelete} on:deleted={handleDelete}/>
    {/if}
</div>


<style>
    .options-dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        height:0;
        width:0;
        visibility: hidden;
        background-color: var(--bg-middle);
        z-index: 999;
        transition: height 0.15s ease-in-out;
        border-radius: 0.5rem;
        right:0;
        overflow: hidden;
    }
        .dropped {
            visibility: visible;
            height: fit-content;
            width: fit-content;
            transition: height 0.15s ease-in-out;
        }
        .options-dropdown > a, .options-dropdown > button {
            padding: 0.5rem 3rem;
            font-size: 1.5rem;
            color: var(--fg-color);
            text-align: center;
            width: 100%;
            border:none;
            background:none;
            outline:none;
            cursor: pointer;
            transition: all 0.1s ease-in-out;
        }
            .options-dropdown > a:hover, .options-dropdown > button:hover {
                background-color: var(--bg-highlight);
            }
    .add-course {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width:100%;
        height:3rem;
        font-size: 4rem;
    }
        .add-course > span {
            font-size: 1rem;
            margin-left: 0.5rem;
        }
    .overlay {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width:100%;
        height:100%;
        background-color: var(--el-bg-color-half);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        opacity: 0;
        transition: all 0.15s ease-in-out;
    }
    .course-wrap {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 6.5rem;
        background-color: var(--bg-color);
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }
        .course-wrap > button {
            margin-left: auto;
            margin-right: 1rem;
            background:none;
            border:none;
            outline:none;
            color: var(--fg-color);
            font-size: 2rem;
            z-index: 2;
            order: 3;
            position: relative;
        }
            .course-wrap > button:hover {
                color: var(--fg-color-2);
                cursor: pointer;
            }
        .course-wrap > img {
            width: 6rem;
            height: 4rem;
            border-radius: 0.5rem;
            margin-left: 1rem;
            object-fit: cover;
        }
        .course-wrap > span {
            position: absolute;
            left: 50%;
            top: 48%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            margin-left: auto;
            margin-right: auto;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width:78%;
            text-align: center;
        }
        .course-wrap > p {
            font-size: 1.2rem;
            margin-left: auto;
            margin-right: 1rem;
            color: var(--fg-color);
            transition: all 0.15s ease-in-out;
            position: absolute;
            bottom:0%;
            left:50%;
            transform: translate(-50%, 50%);
        }
        .course-wrap:hover > p,
        .course-wrap:hover > span {
            opacity: 0;
        }
        .course-wrap:hover > .overlay {
            opacity: 1;
        }
        .course-wrap > button:hover ~ p,
        .course-wrap > button:hover ~ span {
            opacity: 1;
        }
        .course-wrap > button:hover ~ .overlay {
            opacity: 0;
        }
    .courses {
        padding-right: 1rem;
        overflow-y: scroll;
        overflow-x: hidden;
    }
        .courses > h2 {
            width:100%;
            margin: 0 0 1rem 0 !important;
            font-weight: normal;
            color: var(--fg-color);
        }
    .separator-line {
        position: relative;
        display: flex;
        align-items: center;
        background-color: var(--bg-highlight);
    }
    .bottom-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        z-index: 99;
        overflow: hidden;
    }
    .searchbar {
        width: 100%;
        height: 3.5rem;
        border-radius: 0.5rem;
        background-color: var(--bg-color);
        color: var(--fg-color);
        padding: 0.5rem;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        outline: none;
        border: none;
        transition: all 0.15s ease-in-out;
    }
        .searchbar::placeholder {
            color: var(--fg-color);
            opacity: 0.5;
            transition: all 0.15s ease-in-out;
        }
            .searchbar:focus::placeholder {
                opacity: 0.9;
            }
        .searchbar:focus, .searchbar:hover {
            background-color: var(--bg-color) !important;
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
            -webkit-border: none !important;
            color: var(--fg-color) !important;
        }

    * {
        box-sizing: border-box;
        min-width: 0;
    }
</style>