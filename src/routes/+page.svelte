<script lang='ts'>
	import { slide } from 'svelte/transition';
    let weeklyStreakTest = 3;
    let wordCountTest = Math.floor(Math.random() * 1000);

</script>


<div class="outter-wrap" transition:slide>
    <p class="p-welcome-back">Welcome back, <span style="font-weight: bold;">vasillopata</span></p>
    <div style="height:1px; width:100%; background-color:var(--bg-highlight-2); margin-bottom:1rem;"></div>
    <div class="inner-wrap">
        <div class="courses wrap">

        </div>
        <div class="statistics wrap">
            <div class="statistics-row-1">
                <div class="daily-goal stat">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">3</span>
                    <span class="daily-goal-txt-2">day streak <button class="streak-info-btn">i</button></span>
                    <div class="daily-goal-bar">
                        <div style="width:{weeklyStreakTest/7*100}%; height:100%; background-color:var(--green); border-radius:inherit">
                        </div>
                        <i class="bi bi-star-fill"></i>
                        <span>{weeklyStreakTest}/7 days</span>
                    </div>
                </div>
                <div class="word-count stat">
                    <span style="font-weight: bold; font-size:3rem; color:var(--cyan)">{wordCountTest}</span>
                    <span class="daily-goal-txt-2">words learned</span>
                    <span style="margin: auto 0; color:var(--fg-color-2); font-size:1.1rem;">
                    out of <span style="color: var(--selected-text); font-weight:bold;">6173</span></span>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .outter-wrap {
        display: flex;
        flex-direction: column;
        width: 70rem;
        height:40rem;
    }
        .p-welcome-back {
            font-size: 1.5rem;
        }
        .inner-wrap {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
        }
            .inner-wrap > .wrap {
                display:flex;
                flex-direction: column;
                width: 50%;
                height: 100%;
            }
                .courses {

                }
                .statistics-row-1 {
                    width:100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
                .statistics-row-1 > .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 1rem;
                    border:1px solid var(--bg-highlight-2);
                    width: 49.5%;
                    aspect-ratio: 9/5;
                    padding: 0 1rem 1rem 1rem;
                }
                    .daily-goal-txt-2 {
                        font-size: 1.2rem;  
                        display:flex;
                        flex-direction:row; 
                        justify-content:center; 
                        position: relative;
                    }
                        .streak-info-btn {
                            position: absolute;
                            top: 50%;
                            right:0%;
                            transform: translate(130%, -50%);
                            border-radius: 999px;
                            border:none;
                            width:1.4rem;
                            height:1.4rem;
                            font-size: 1.2rem;
                            font-family: var(--font-important);
                            background-color: var(--bg-highlight);
                            color: var(--fg-color);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            transition: all 0.1s ease-in-out;
                        }
                        .streak-info-btn:hover {
                            background-color: var(--bg-midle);
                            box-shadow: 0px 0px 2px 2px var(--bg-highlight-2);
                            color: var(--selected-text);
                        }
                    .daily-goal-bar {
                        width: 100%;
                        height: 0.5rem;
                        background-color: var(--bg-highlight-2);
                        border-radius: 999px;
                        margin-top: 1.5rem;
                        margin-bottom: 1.5rem;
                        position:relative;
                    }
                        .daily-goal-bar > span {
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            color: var(--fg-color);
                            top:190%;
                        }
                        .bi-star-fill {
                            position:absolute;
                            top:50%;
                            right:-4%; 
                            transform: translateY(-60%); 
                            font-size: 1.75rem;
                            color: var(--gold);
                        }
    * {
        box-sizing: border-box;
    }
</style>