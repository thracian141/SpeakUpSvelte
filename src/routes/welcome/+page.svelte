<script lang="ts">
    import { onMount } from "svelte";

    let langs: HTMLDivElement[] = [];
    let anyHovered = false;
    let hoveredLang: string;

    onMount(async () => {
        langs = await Array.from(document.getElementsByClassName("language") as HTMLCollectionOf<HTMLDivElement>);
        //check if any language is hovered and set anyHovered to true and hoveredLang to the hovered language
        langs.forEach((lang) => {
            lang.addEventListener("click", () => {
                if (anyHovered) {
                    langs.forEach((lang) => {
                        if (lang.id != hoveredLang) {
                            lang.style.display = "none";
                        }
                    });
                }
            });
        });
    });
</script>


<div class="outwrap">
    <div class="top">
        <h1 style="text-shadow: -1px 5px 6px var(--selected-text);">
            <span style="font-family: var(--font-important); font-weight:normal">Welcome to</span> 
            <span style="color: var(--selected-text); text-shadow: -1px 5px 6px var(--cyan-half);">SPEAKUP</span>
        </h1>
    </div>
    <div class="cards">
        <div class="card" style="rotate:-5deg">
            <h1>Learn <span style="color: var(--cyan);">your</span> favorite <br>language!</h1>
            <img src="/art2.svg" alt="ai art" class="art" style="rotate:-1.5deg"/>
        </div>
        <div class="card" style="z-index:1;">
            <h1>Simple, engaging, and <span style="color:var(--green)">FREE</span> courses in <span style="color:var(--red)">5</span> languages.</h1>
            <img src="/languagesart.png" alt="people speaking different languages" class="art" style="width: 120%; height:auto; margin-right:1rem;"/>
        </div>
        <div class="card" style="rotate:5deg; text-align:right">
            <h1>You need just <span style="color: var(--selected-text);"><br>15 minutes<br></span> a day</h1>
            <img src="/hourglass.svg" alt="hourglass" class="art" style="rotate:1deg">
        </div>
    </div>
    <div class="offeredlangs">
        <h1>Choose a language <span style="color: var(--selected-text);">you</span> want to learn</h1>
        <div class="language" id="de" class:unhovered={(anyHovered && hoveredLang!='de')} on:mouseenter={()=>{anyHovered=true; hoveredLang='de'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png" alt="de" />
            </div>
            <span>German</span>
        </div>
        <div class="language" id="it" class:unhovered={(anyHovered && hoveredLang!='it')} on:mouseenter={()=>{anyHovered=true; hoveredLang='it'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png" alt="it" />
            </div>
            <span>Italian</span>
        </div>
        <div class="language" id="en" class:unhovered={(anyHovered && hoveredLang!='en')} on:mouseenter={()=>{anyHovered=true; hoveredLang='en'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png" alt="en" />
            </div>
            <span>English</span>
        </div>
        <div class="language" id="bg" class:unhovered={(anyHovered && hoveredLang!='bg')} on:mouseenter={()=>{anyHovered=true; hoveredLang='bg'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png" alt="bg" />
            </div>
            <span>Bulgarian</span>
        </div>
        <div class="language" id="tr" class:unhovered={(anyHovered && hoveredLang!='tr')} on:mouseenter={()=>{anyHovered=true; hoveredLang='tr'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" alt="tr" />
            </div>
            <span>Turkish</span>
        </div>
    </div>

</div>


<style>
    .unhovered {
        opacity: 0.6;
        transform: scale(0.975);
    }
    .language {
        background-color: var(--el-bg-color-half);
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        width: 80rem;
        height:9rem;
        margin-bottom: 1rem;
        padding:2rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.5rem 1rem 0.5rem #00000000;
        transition: opacity 0.5s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
        .language:hover {
            cursor: pointer;
            transform: scale(1.05);
            box-shadow: 0 0 1rem 0.2rem var(--fg-color-half);
        }
        .imgwrap {
            height: 100%;
            width: 7rem;
            border-radius: 0.5rem;
            overflow: hidden;
            border: 1px solid var(--fg-color-half);
        }
            .imgwrap img {
                height: 100%;
                width: 100%;
            }
        .language span {
            font-size: 2.5rem;
            line-height: 5rem;
            margin-left: 2rem;
            color: var(--fg-color);
        }
    .offeredlangs {
        width:100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
        .offeredlangs h1 {
            font-family: var(--font-important);
            font-size: 4rem;
            margin-bottom: 5rem;
        }
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
        width: 100%;
        height:80vh;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0 6vw;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        height:calc(30rem + 6.5vh);
        width:calc(26rem + 3vw);
        border-radius: 0.5rem;
        background-color: var(--el-bg-color-half);
        box-sizing: border-box;
        padding: 1.2rem 2rem;
        backdrop-filter:blur(12px);
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1rem 2.5rem 0.5rem #00000010;
    }
        .card h1 {
            height:40%;
            width:100%;
            font-size: calc(2.5rem + 0.25vw);
            margin: 0 auto;
            font-family: var(--font-important);
        }
        .art {
            height:63%;
            margin-top: 2rem;
            border-radius: 0.4rem;
        }
        .card:nth-child(2) {
            margin-top: -2rem;
        }
        .card:hover {
            z-index: 3;
            transform: scale(1.1); 
            box-shadow: 0 1.1rem 3rem 0.5rem #00000050;
        }
    .outwrap {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 300vh;
        background: radial-gradient(at bottom, var(--cyan-half) 0%, var(--bg-color) 100%);
    }
</style>