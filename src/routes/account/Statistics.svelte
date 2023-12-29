<script lang="ts">
    let wordsTotal = 5138;
    let wordsLearnt = 2134;
    let goalWords = 3000;

    async function handleHover(id: string) {
        const scale = await document.getElementById(id);
        if (scale) {
            const scaleValues = [0, 1.2, 0.8, 1.1, 0.925, 1.05, 1];
            scaleValues.forEach((value, index) => {
                setTimeout(async () => {
                    scale.style.transform = `scaleY(${value})`;
                }, index * 200);
            });
        }
    }
</script>

<div class="panel">
    <div class="top">
        <div class="words-learnt-wrap">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-right:auto; margin-left:0.8rem;">{wordsTotal}</span>
            <span style="position: absolute; right:0%; bottom:0%; font-size:0.95rem;">{Math.round((wordsLearnt/wordsTotal)*100)}%</span>
            <span style="position: absolute; right:0%; top:5%; font-size:0.95rem;">{wordsLearnt}</span>
            <span style="position: absolute; right:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">learnt</span>
            <span style="position: absolute; right:0%; top:44%; font-size:0.95rem;">{wordsTotal-wordsLearnt}</span>
            <span style="position: absolute; right:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">left</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("wlearnt")} role="presentation">
                <div id="wlearnt" class="words-learnt-progress" style="height: {(wordsLearnt/wordsTotal)*100}%;transform: scaleY(1)"></div>
                <span style="position: absolute; color:var(--bg-color); left:8%; font-size:0.95rem;">{wordsLearnt}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">WORDS LEARNT</span>
        </div>
        <div class="words-learnt-wrap">
            <span style="font-size:0.95rem; color:var(--fg-color); margin-left:auto; margin-right:0.8rem;">{goalWords}</span>
            <span style="position: absolute; left:0%; bottom:0%; font-size:0.95rem;">{Math.round((wordsLearnt/goalWords)*100)}%</span>
            <span style="position: absolute; left:0%; top:5%; font-size:0.95rem;">{wordsLearnt}</span>
            <span style="position: absolute; left:0%; top:17%; font-size:0.95rem; color:var(--fg-color-2)">learnt</span>
            <span style="position: absolute; left:0%; top:44%; font-size:0.95rem;">{goalWords-wordsLearnt}</span>
            <span style="position: absolute; left:0%; top:56%; font-size:0.95rem; color:var(--fg-color-2)">left</span>
            <div class="words-learnt-bar" on:mouseenter={async()=>handleHover("ygoal")} role="presentation" style="margin-right:0;margin-left:auto;">
                <div id="ygoal" class="words-learnt-progress your-goal" style="height: {(wordsLearnt/goalWords)*100}%;transform: scaleY(1)"></div>
                <span style="position: absolute; color:var(--bg-color); right:8%; font-size:0.95rem;">{wordsLearnt}</span>
            </div>
            <span style="position: absolute; bottom:-25%; font-size:0.9rem; color:var(--fg-color); 
              font-weight:bold; transform:scaleY(0.92)">YOUR GOAL</span>
        </div>
    </div>
</div>

<style>
    .your-goal {
        background: linear-gradient(to bottom, var(--green), var(--green-half)) !important;
    }
    .words-learnt-progress {
        background: linear-gradient(to bottom, var(--cyan), var(--cyan-half));
        width:100%;
        border-radius: 0.25rem 0.25rem 0 0;
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: bottom;
        will-change: transform;
    }
    .words-learnt-bar {
        background-color: var(--bg-color);
        width:4rem;
        height:8rem;
        border-radius:0.4rem 0.4rem 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        overflow: hidden;
        padding:0.35rem 0.35rem 0 0.35rem;
        box-sizing: border-box;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
        margin-right: auto;
    }
    .words-learnt-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid var(--bg-highlight);
        width:10rem;
        position: relative;
    }
    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width:100%;
        box-sizing: border-box;
    }
    .panel {
        background-color: var(--el-bg-color);
        width:35rem;
        height:42rem;
        border-radius: 0.7rem;
        padding: 2rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
</style>