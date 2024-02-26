<script lang='ts'>

</script>


<div class="outter-wrap">
    <p class="p-welcome-back">Welcome back, <span style="font-weight: bold;">vasillopata</span></p>
    <div style="height:1px; width:100%; background-color:var(--bg-highlight-2)"></div>
    <div class="inner-wrap">
        <div class="courses wrap">

        </div>
        <div class="statistics wrap">
            <div class="daily-goal">
                <span style="font-weight: bold; font-size:2rem;">3</span>
                <span>day streak <button class="streak-info-btn">i</button></span>
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
                .statistics > .daily-goal {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                    .streak-info-btn {
                        border-radius: 999px;
                        border:none;
                        width:1.5rem;
                        height:1.5rem;
                        font-size: 1.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
</style>