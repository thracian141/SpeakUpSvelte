<script lang="ts">
    import { slide, fly } from "svelte/transition";

    let currentDate = new Date();
    let dateRangeSelection = "month";

    let weekDates = Array.from({length: 7}, (_, i) => {
        let d = new Date(currentDate);
        d.setDate(d.getDate() - i);
        return d;
    }).reverse();

    let monthDates = Array.from({length: 35}, (_, i) => {
        let d = new Date(currentDate);
        d.setDate(d.getDate() - i);
        return d;
    }).reverse();

    let hasStudied = new Map();
    for (let i = 0; i < 90; i++) {
        let randomValue = Math.random() < 0.5;
        let date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        hasStudied.set(date.toISOString().split('T')[0], randomValue);
    }

</script>


<div class="wrap">
    <h3 style="margin:0; margin-bottom:1rem">Daily Goals</h3>
    {#if dateRangeSelection == "week"}
        <div class="week-wrapper">
            {#each weekDates as day (day)}
                <div class="day-box" transition:slide|global>
                    <div class="week-day-box" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <span>{day.toLocaleString('en-US', { weekday: 'short' }).toUpperCase()}</span>
                </div>
            {/each}
        </div>
    {:else if dateRangeSelection == "month"}
    <div style="display:flex; flex-direction:row; width:100%; height:100%; flex-wrap:wrap;">
        <!-- Previous month -->
        <div class="month-wrap" style="opacity: 0.4; margin-right:3rem;">
            <h3 style="margin-left:0.75rem;">{new Date(currentDate.getFullYear(), currentDate.getMonth() - 1).toLocaleString('en-GB', { month: 'long' })}</h3>
            <div class="month-days">
                {#each monthDates.filter(day => day.getMonth() !== currentDate.getMonth()) as day (day)}
                    <div class="day-box" transition:slide|global>
                        <div class="week-day-box month" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <span>{day.getDate()}</span>
                    </div>
                {/each}
            </div>
        </div>
        <!-- Current month First 5 Days -->
        <div class="month-wrap">
            <h3 style="margin-left:auto; margin-right:0.75rem">{currentDate.toLocaleString('en-GB', { month: 'long' })}</h3>
            <div class="month-days">
                {#each monthDates.filter(day => day.getMonth() === currentDate.getMonth()).slice(0, 4) as day (day)}
                    <div class="day-box" transition:slide|global>
                        <div class="week-day-box month" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <span>{day.getDate()}</span>
                    </div>
                {/each}
            </div>
        </div>
        <!-- Current month Rest of -->
        <div class="month-wrap" style="flex-wrap: wrap;">
            <div class="month-days" style="flex-wrap: wrap;">
                {#each monthDates.filter(day => day.getMonth() === currentDate.getMonth()).slice(4) as day (day)}
                    <div class="day-box" transition:slide|global>
                        <div class="week-day-box month" class:filled={hasStudied.get(day.toISOString().split('T')[0])}>
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <span>{day.getDate()}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
    {/if}
    <button on:click={() => {
                            if (dateRangeSelection=="week")
                                {
                                    dateRangeSelection="month";
                                } 
                            else 
                                {
                                    dateRangeSelection="week";
                                }
                            }
                    }
    >
        <i class="bi bi-calendar-week"></i>
        <span>View goals for the current {dateRangeSelection}</span>
    </button>
</div>


<style>
    .wrap > button {
        position: absolute;
        right: 0;
        bottom:0;
        border:none;
        background-color: var(--bg-color);
        color: var(--fg-color);
        font-size: 2rem;
    }
        .wrap > button > span {
            display: none;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right:100%;
            font-size: 1rem;
            width:10rem;
        }
        .wrap > button:hover > span {
            display: inline-block;
        }
    .month-wrap {
        display: flex;
        flex-direction: column;
    }
        .month-wrap > h3 {
            margin-top: 0;
        }
    .month-days {
        display: flex;
        flex-direction: row;
    }
    .month {
        width:2rem !important;
        border-width: 0.15rem !important;
    }
    .day-box {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding:0.5rem;
        align-items: center;
        border-radius: 0.3rem;
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
        position: relative;
    }
</style>