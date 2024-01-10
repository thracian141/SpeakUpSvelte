<script lang="ts">

</script>


<div class="outwrap">
    <div class="top">
        <h1 style="text-shadow: -1px 5px 6px var(--selected-text);">
            <span style="font-family: var(--font-important); font-weight:normal">Welcome to</span> 
            <span style="color: var(--selected-text); text-shadow: -1px 5px 6px var(--cyan-half);">SPEAKUP</span>
        </h1>
    </div>
    <div class="cards">
        <div class="card" style="top:4rem; left:5%; rotate:-5deg">
            <h1>Learn <span style="color: var(--cyan);">your</span> favorite language!</h1>
            <img src="/art2.svg" alt="ai art" class="art" style="rotate:-1.5deg"/>
        </div>
        <div class="card" style="top:2rem; left:50%; transform:translateX(-50%); z-index:1;">
            <h1>Simple, engaging, and <span style="color:var(--green)">FREE</span> courses in <span style="color:var(--red)">5</span> languages.</h1>
            <img src="/languagesart.png" alt="people speaking different languages" class="art" style="width: 120%; height:auto; margin-right:1rem;"/>
        </div>
        <div class="card" style="top:4rem; right:5%; rotate:5deg; text-align:right">
            <h1>You need just <span style="color: var(--selected-text);"><br>15 minutes<br></span> a day</h1>
            <img src="/hourglass.svg" alt="hourglass" class="art" style="rotate:1deg">
        </div>
    </div>

</div>


<style>
    .top {
        width: 100%;
        height: 60vh;
        position: relative;
    }
        .top h1 {
            position: absolute;
            right:5%;
            top:40%;
            transform: translateY(-50%);
            font-size: 5rem;
        }
    .cards {
        position: relative;
        width: 100%;
        height:100vh;
    }
    .card {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 32rem;
        width: 26rem;
        border-radius: 0.5rem;
        background-color: var(--el-bg-color-half);
        box-sizing: border-box;
        padding: 1.2rem 2rem;
        backdrop-filter:blur(12px);
    }
        .card h1 {
            height:40%;
            width:100%;
            font-size: 2.55rem;
            margin: 0 auto;
            font-family: var(--font-important);
        }
        .art {
            height:63%;
            margin-top: auto;
            border-radius: 0.4rem;
        }
        .card:nth-child(2):hover {
            transform: translateX(-50%);
        }
        .card:hover {
            cursor: pointer;
            z-index: 3;
            transform: scale(1.02); 
        }
    .outwrap {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 300vh;
        background: radial-gradient(at bottom, var(--cyan-half) 0%, var(--bg-color) 100%);
    }
</style>