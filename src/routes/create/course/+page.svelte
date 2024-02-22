<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import {decks} from '../../decks/testDecks';

    let date = new Date();
    let todayDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    let todayHour = date.getHours() + ':' + date.getMinutes();

    let currentHovered = '';
    $: anyHovered = currentHovered != '';

    function handleEnter(lang: string) {
        currentHovered = lang;
    }
    function handleLeave() {
        currentHovered = '';
    }
</script>


<div class="wrap" transition:slide>
    <h1>Pick a course to edit</h1>
    <div class="course-list">
        <div class="course-box">
            <a href="/create/course/en" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='en'}
            on:mouseenter={()=>{handleEnter('en')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[1].image} alt="English deck">
                <span>English</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">18</span> sections</span>
                <span><span style="color: var(--cyan);">317</span> cards</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/bg" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='bg'}
            on:mouseenter={()=>{handleEnter('bg')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[0].image} alt="Bulgarian deck">
                <span>Bulgarian</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">21</span> sections</span>
                <span><span style="color: var(--cyan);">317</span> cards</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/de" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='de'}
            on:mouseenter={()=>{handleEnter('de')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[2].image} alt="German deck">
                <span>German</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">14</span> sections</span>
                <span><span style="color: var(--cyan);">276</span> cards</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/tr" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='tr'}
            on:mouseenter={()=>{handleEnter('tr')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[3].image} alt="Turkish deck">
                <span>Turkish</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">15</span> sections</span>
                <span><span style="color: var(--cyan);">325</span> cards</span>
            </div>
        </div>
        <div class="course-box">
            <a href="/create/course/it" class="course-link" class:any-hovered={anyHovered} class:this-hovered={currentHovered=='it'}
            on:mouseenter={()=>{handleEnter('it')}} on:mouseleave={()=>{handleLeave()}}>
                <img src={decks[4].image} alt="Italian deck">
                <span>Italian</span>
            </a>
            <div class="description">
                <span><span style="color: var(--selected-text);">9</span> sections</span>
                <span><span style="color: var(--cyan);">198</span> cards</span>
            </div>
        </div>
    </div>
    {#if anyHovered}
        <h3 transition:fade={{duration:150}} style="margin-bottom: 0.5rem;">
            Last edited by: <span style="color: var(--cyan);">vasillopata</span>
        </h3>
        <h4 transition:fade={{duration:150}} style="margin:0;">
            On <span style="color: var(--green);">{todayDate}</span> at 
            <span style="color: var(--fg-color-2);">{todayHour}</span>
        </h4>
    {/if}
</div>


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