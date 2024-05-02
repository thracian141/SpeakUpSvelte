<script lang="ts">
    import { slide } from "svelte/transition";
    import {_} from "svelte-i18n";
    import {changeDailyGoal} from '$lib/scripts/DailyPerformanceHandler'

    export let currentDailyGoal: number;
    let newDailyGoal: number = currentDailyGoal;

    let inputElement: HTMLInputElement;

    $: newDailyGoal = Math.min(30, Math.max(1, newDailyGoal));
</script>


<div transition:slide class="wrapper-drop">
    <span style="font-size: 1.1rem;">{$_('home.current_goal')}: <span style="color: var(--selected-text); font-weight:bold;">{currentDailyGoal}</span></span>
    <div class="input-row">
        <span style="margin-right: 0.2rem;">{$_('home.new_goal')}:</span> 
        <input min="1" max="30" type="number" bind:value={newDailyGoal} bind:this={inputElement}/>
        <div style="display: flex; flex-direction:column; align-items:center;">
            <button class="btn" on:click={()=>{newDailyGoal++}}>+</button>
            <button class="btn" on:click={()=>{newDailyGoal--}}>-</button>
        </div>
    </div>
    <span style="color:var(--cyan)">{$_('home.new_words_a_day')}</span>
    <button on:click={async()=>await changeDailyGoal(newDailyGoal)} class="submit-btn"><i class="bi bi-check"></i></button>
</div>

<style>
    @media (hover: none) {
        .submit-btn {
            height: 3rem !important;
        }
        .wrapper-drop {
            height:20rem !important;
            padding: 1rem 1rem !important;
            justify-content: space-between !important;
        }
        input[type="number"] {
            height: 4.5rem !important;
            width: 3.5rem !important;
            font-size: 2rem !important;
        }
        .btn {
            width: 2.25rem !important;
            height: 2.25rem !important;
            font-size: 2rem !important;
        }

    }
    .wrapper-drop {
        position: absolute; 
        left:50%; 
        top:100%; 
        z-index:9999; 
        transform:translateX(-50%); 
        background-color:var(--bg-color); 
        padding:1.5rem; 
        border-radius:0.5rem; 
        border:1px solid var(--bg-highlight-2); 
        width:14rem; 
        height:12rem; 
        display:flex; 
        flex-direction:column; 
        justify-content:center; 
        align-items:left;
    }
    .submit-btn {
        background-color: var(--green);
        color: white;
        border: none;
        border-radius: 0.5rem;
        width: 100%;
        height: 2rem;
        margin-top: 1rem;
        font-size: 1.1rem;
        cursor: pointer;
        transition: opacity 0.1s;
    }
    .submit-btn:hover {
        opacity: 0.8;
    }
    .input-row {
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        font-size: 1.1rem;
    }
        .btn {
            color: white;
            border: none;
            width: 1.5rem;
            height: 1.5rem;
            font-size: 1.1rem;
            cursor: pointer;
        }
            .btn:first-child {
                border-radius: 0 0.5rem 0 0;
                background-color: var(--green);
            }
            .btn:last-child {
                border-radius: 0 0 0.5rem 0;
                background-color: var(--red);
            }
            .btn:hover {
                opacity: 0.8;
            }
    input[type="number"] {
        background-color: var(--el-bg-color);
        color: var(--fg-color);
        border: none;
        border-radius: 0.5rem;
        width: 2.75rem;
        height: 3rem;
        margin: 1rem 0;
        font-size: 1.1rem;
        text-align: center;
        padding:0.5rem;
    }
    input[type="number"] {
        -webkit-appearance: textfield; /* This removes the default styles of the number input in Webkit browsers like Chrome and Safari */
        -moz-appearance: textfield; /* This removes the default styles of the number input in Firefox */
        appearance: textfield; /* This removes the default styles of the number input in other browsers */
    }

    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button { /* This targets the spin buttons in Webkit browsers */
        -webkit-appearance: none; /* This removes the default spin buttons */
        margin: 0; /* This removes the default spin buttons */
    }
    * { 
        box-sizing: border-box;
    }
</style>