<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import {decks} from '../../decks/testDecks';
    import {_} from '$lib/i18n';
    import {isNarrowScreen} from '$lib/store';
    import './createCourse.css'
    import { onMount } from 'svelte';
    import { getLastEdit } from '$lib/scripts/CourseHandler';
    import {checkIfAdmin} from '$lib/scripts/UserHandler';
    import {checkIfDev} from '$lib/scripts/UserHandler'

    let date = new Date();
    let todayDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    let todayHour = date.getHours() + ':' + date.getMinutes();
    let isAdmin = false;

    let currentHovered = '';
    $: anyHovered = currentHovered != '';


    let lastEditUsername:string = '';
    let lastEditDate: Date = new Date();
    async function handleEnter(lang: string) {
        const tuple = await getLastEdit(lang);
        lastEditUsername = tuple.username;
        lastEditDate = tuple.date;
        console.log(lang)
        currentHovered = lang;
    }
    function handleLeave() {
        currentHovered = '';
    }

    onMount(async () => {
        isAdmin = await checkIfAdmin();
        if (!isAdmin) {
            isAdmin = await checkIfDev();
        }
    });
</script>

{#if isAdmin}
<div class="wrap" class:wrap-m={$isNarrowScreen} transition:slide>
    <h1>{$_('create.course.pick_a_course_to_edit')}</h1>
    <div class="course-list" class:course-list-m={$isNarrowScreen}>
        <div class="course-box">
            <a href="/create/course/bg-to-en" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='en'}
            on:mouseenter={()=>{handleEnter('bg-to-en')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[1].image} alt="English deck">
                <span>Английски</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">18</span> {$_('create.course.sections')}</span>
                <span><span style="color: var(--cyan);">317</span> {$_('create.course.cards')}</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/en-to-bg" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='bg'}
            on:mouseenter={()=>{handleEnter('en-to-bg')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[0].image} alt="Bulgarian deck">
                <span>Bulgarian</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">21</span> {$_('create.course.sections')}</span>
                <span><span style="color: var(--cyan);">317</span> {$_('create.course.cards')}</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/en-to-de" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='de'}
            on:mouseenter={()=>{handleEnter('en-to-de')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[2].image} alt="German deck">
                <span>German</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">14</span> {$_('create.course.sections')}</span>
                <span><span style="color: var(--cyan);">276</span> {$_('create.course.cards')}</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/en-to-tr" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='tr'}
            on:mouseenter={()=>{handleEnter('en-to-tr')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[3].image} alt="Turkish deck">
                <span>Turkish</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">15</span> {$_('create.course.sections')}</span>
                <span><span style="color: var(--cyan);">325</span> {$_('create.course.cards')}</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/en-to-it" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='it'}
            on:mouseenter={()=>{handleEnter('en-to-it')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[4].image} alt="Italian deck">
                <span>Italian</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">9</span> {$_('create.course.sections')}</span>
                <span><span style="color: var(--cyan);">198</span> {$_('create.course.cards')}</span>
            </div>
        </div>
    </div>
    {#if anyHovered}
        <h3 transition:fade={{duration:150}} style="margin-bottom: 0.5rem;">
            {$_('create.course.last_edited_by')} <span style="color: var(--cyan);">{lastEditUsername}</span>
        </h3>
        <h4 transition:fade={{duration:150}} style="margin:0;">
            {$_('create.course.on')} <span style="color: var(--green);">{todayDate}</span> {$_('create.course.at')} 
            <span style="color: var(--fg-color-2);">{todayHour}</span>
        </h4>
    {/if}
</div>
{:else}
    <h1>Unauthorized</h1>
{/if}


<style>
    .wrap {
        display:flex;
        flex-direction: column;
        background-color: var(--el-bg-color);
        width: 65rem;
        height: 42rem;
        border-radius: 1rem;
        align-items: center;
    }
    h1 {
        margin: 3rem auto 2rem auto;
    }
    .course-box {
        display: flex;
        flex-direction: column;
        width: 15rem;
        margin-right: 2rem;
    }
        .course-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: flex-start;
            align-content: center;
            width:55rem;
            padding: 2rem;
        }
            .description {
                display: flex;
                flex-direction: column;
                margin: 0.5rem 1rem 2rem 1rem;
                gap:0.3rem;
                font-size: 1.1rem;
            }
                .description > span {
                    border-bottom: 1px solid var(--bg-highlight);
                    height:1.8rem;
                }
            .course-link {
                display:flex;
                flex-direction: row;
                height:5rem;
                width:100%;
                border-radius: 1.2rem;
                border: 2px solid var(--bg-highlight);
                padding: 1rem;
                align-items: center;
                transition: all 0.2s ease-in-out;
            }
                .course-link > img {
                    height:100%;
                    aspect-ratio: 3/2;
                    border-radius: 0.5rem;
                    object-fit: cover;
                }
                .course-link > span {
                    font-size: 1.2rem;
                    margin-left: 1rem;
                    margin-bottom: 0.3rem;
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
    * {
        box-sizing: border-box;
        min-width: 0;
        min-height: 0;
    }
</style>