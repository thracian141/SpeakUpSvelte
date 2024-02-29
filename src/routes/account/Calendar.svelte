<script lang="ts">
    import { slide } from "svelte/transition";
    import { isNarrowScreen } from "$lib/store";
    import {_, locale} from "$lib/i18n";

    let currentDate = new Date();
    let dateRangeSelection = "week";
    let localeVar = "en-GB";
    $: localeVar = $locale == "bg" ? "bg-BG" : "en-GB";

    $: weekDates = Array.from({length: 7}, (_, i) => {
        let d = new Date(currentDate);
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString(localeVar, { weekday: 'short' });
    }).reverse();

    $: monthDates = Array.from({length: 35}, (_, i) => {
        let d = new Date(currentDate);
        d.setDate(d.getDate() - i);
        return d;
    }).reverse();
    $: lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

    let hasStudied = new Map();
    for (let i = 0; i < 90; i++) {
        let randomValue = Math.random() < 0.5;
        let date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        hasStudied.set(date.toISOString().split('T')[0], randomValue);
    }

</script>


<div class="wrap" style="{$isNarrowScreen ? "margin-top:0;" : ""}">
    <h3 style="margin:0; margin-bottom:1rem">{$_('account.daily_goals')}</h3>
    {#if dateRangeSelection == "week"}
        <div class="week-wrapper" in:slide out:slide>
            {#each weekDates as day (day)}
                <div class="day-box" style="{$isNarrowScreen ? "padding:0.21rem; width:14%;" : ""}">
                    <div class="week-day-box" class:filled={hasStudied.get(day.split('T')[0])}
                                     style="{$isNarrowScreen ? " width:100%;" : ""}">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <span>{day.toUpperCase()}</span>
                </div>
            {/each}
        </div>
        <div in:slide out:slide>
            {#if hasStudied.get(currentDate.toISOString().split('T')[0]) == true}
                <h1 style="margin-bottom: 0;">{$_('account.you')} <span style="color: var(--green);">{$_('account.have_studied')}</span> {$_('account.today')}</h1>
                <h1>{$_('account.great_job')}</h1>        
            {:else if hasStudied.get(currentDate.toISOString().split('T')[0]) == false}
                <h1 style="margin-bottom: 0;">{$_('account.you')} <span style="color: var(--red);">{$_('account.have_not_studied')}</span> {$_('account.today')}</h1>
                <h1>{$_('account.try_to_reach_your_goal')}</h1>
            {/if}
        </div>
    {:else if dateRangeSelection == "month"}
        <!-- Previous month -->
    <div class="month-wrap" style="flex-wrap:wrap; {$isNarrowScreen ? "align-content:flex-start" : ""}" in:slide out:slide>
        <div class="month-text"><h3 style="{$isNarrowScreen ? "margin-top:-0.8rem;" : ""}">
            {new Date(lastMonth.getMonth()).toLocaleString(localeVar, { month: 'long' })}
        </h3></div>
        {#each monthDates.filter(day => day.getMonth() !== currentDate.getMonth()) as day (day)}
        <div class="day-box" style="opacity: 0.4; {$isNarrowScreen ? "padding:0.21rem; margin-bottom:1.4rem; margin-right:0.25rem; width:2.3rem;" : ""}">
            <div class="week-day-box month" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                <i class="bi bi-check-lg"></i>
            </div>
            <span style="{$isNarrowScreen ? "margin-top:0rem;" : ""}">{day.getDate()}</span>
        </div>
        {/each}
        <div class="month-text"><h3 style="{$isNarrowScreen ? "margin-top:-0.8rem;" : ""}">
            {new Date().toLocaleString(localeVar, { month: 'long' })}
        </h3></div>
        {#each monthDates.filter(day => day.getMonth() === currentDate.getMonth()) as day (day)}
        <div class="day-box" style="{$isNarrowScreen ? "padding:0.21rem; margin-bottom:1rem; margin-right:0.25rem; width:2.3rem;" : ""}">
            <div class="week-day-box month" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                <i class="bi bi-check-lg"></i>
            </div>
            <span style="{$isNarrowScreen ? "margin-top:0rem;" : ""}">{day.getDate()}</span>
        </div>
        {/each}
    </div>
    {/if}
</div>
<button on:click={() => {if (dateRangeSelection=="week"){dateRangeSelection="month";} else {dateRangeSelection="week";}}}>
    <i class="bi" class:bi-calendar3={dateRangeSelection=="week"} class:bi-calendar3-week={dateRangeSelection=="month"}></i>
    <span>View goals for the current {dateRangeSelection}</span>
</button>


<style>
    button {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        bottom:0;
        transform: translate(-50%, -50%);
        border:none;
        background-color: var(--bg-color);
        color: var(--fg-color);
        font-size: 1.6rem;
        padding: 1rem;
        width:3.5rem; 
        height:3.5rem;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out;
    }
        button > span {
            display: none;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:100%;
            font-size: 1rem;
            width:10rem;
        }
        button:hover {
            background-color: var(--bg-middle);
            color: var(--fg-color-2);
        }
        button:hover > span {
            display: inline-block;
            box-sizing: border-box;
            padding:0.5rem 0;
            border-radius: 0.5rem;
            margin-right: 0.25rem;
            border: 1px solid var(--bg-highlight);
            background-color: var(--bg-middle);
            color: var(--fg-color) !important;
        }
    .month-wrap {
        display: flex;
        flex-direction: row;
        position: relative;
        justify-content:flex-start;
        box-sizing: border-box;
        width:100%;
        height:100%;
    }
        .month-text {
            width:0;
            overflow: visible;
            z-index: 3;
        }
        .month-text > h3 {
            margin:0;
            line-height: 0;
            margin-top: -0.5rem;
            padding-left: 0.5rem;
            width:0;
            box-sizing: border-box;
            font-size: 1rem;
        }
    .month {
        width:2.2rem !important;
        border-width: 0.15rem !important;
    }
    .day-box {
        display: inline-flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:0.6rem;
        align-items: center;
        border-radius: 0.3rem;
        z-index: 0;
    }
    .day-box > .filled + span {
        color: var(--fg-color) !important;
    }
    .day-box:hover {
        background-color: var(--bg-middle);
    }
    .filled {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-color) !important;
    }
        .filled > i {
            color: var(--green);
            display: inline-block !important;
        }
    .week-day-box {
        display: flex;
        width: 3rem;
        aspect-ratio: 1;
        background-color: var(--el-bg-color);
        border: 0.2rem solid var(--bg-highlight);
        box-sizing: border-box;
        border-radius: 0.25rem;
    }
        .week-day-box > i {
            display: none;
        }
        .day-box > span {
            color: var(--fg-color-2);
            margin-top: 0.3rem;
            font-size: 0.8rem;
            font-weight: bold;
        }
        .week-wrapper > .day-box:last-child > span {
            font-weight: bolder;
            color:var(--selected-text) !important;
            text-decoration:dotted underline;
            text-decoration-thickness: 2.5px;
            text-underline-offset: 0.2rem;
        }
    .week-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        margin-top:2rem;
        flex-grow: 1;
        overflow: hidden;
    }
</style>