<script lang="ts">
	import { slide } from 'svelte/transition'; import { onMount } from "svelte";
    import {register} from '$lib/scripts/UserHandler';

    let langs: HTMLDivElement[] = [];
    let anyHovered = false;
    let hoveredLang: string;
    let selectedLang: string = 'none';

    let username = '';
    let password = '';
    let confirmpassword = '';
    let email = '';

    let error = '';

    onMount(async () => {
        langs = await Array.from(document.getElementsByClassName("language") as HTMLCollectionOf<HTMLDivElement>);
        //check if any language is hovered and set anyHovered to true and hoveredLang to the hovered language
        langs.forEach((lang) => {
            lang.addEventListener("click", () => {
                if (anyHovered) {
                    selectedLang = hoveredLang;
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
        <h1 style="text-shadow: -1px 5px 6px var(--cyan-half);">
            <span style="font-family: var(--font-important); color:var(--fg-ultra); font-weight:normal">Welcome to</span> 
            <img src="/logo.svg" style="height:6rem; width:auto; margin-bottom:-1rem; margin-right:-0.5rem; filter:drop-shadow(-2px 4px 3px var(--fg-color-half))" alt="logo"/>
            <span style="color: var(--selected-text); text-shadow: -1px 5px 6px var(--cyan-half);">SPEAKUP</span>
        </h1>
        <a href="/authenticate/login" style="text-shadow: -1px 3px 5px var(--cyan-half);">already have an account?</a>
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
        <div class="language" id="en-to-de" class:unhovered={(anyHovered && hoveredLang!='en-to-de')} on:mouseenter={()=>{anyHovered=true; hoveredLang='en-to-de'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png" alt="en-to-de" />
            </div>
            <span>German</span>
        </div>
        <div class="language" id="en-to-it" class:unhovered={(anyHovered && hoveredLang!='en-to-it')} on:mouseenter={()=>{anyHovered=true; hoveredLang='en-to-it'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png" alt="en-to-it" />
            </div>
            <span>Italian</span>
        </div>
        <div class="language" id="bg-to-en" class:unhovered={(anyHovered && hoveredLang!='bg-to-en')} on:mouseenter={()=>{anyHovered=true; hoveredLang='bg-to-en'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png" alt="bg-to-en" />
            </div>
            <span>English</span>
        </div>
        <div class="language" id="en-to-bg" class:unhovered={(anyHovered && hoveredLang!='en-to-bg')} on:mouseenter={()=>{anyHovered=true; hoveredLang='en-to-bg'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png" alt="en-to-bg" />
            </div>
            <span>Bulgarian</span>
        </div>
        <div class="language" id="en-to-tr" class:unhovered={(anyHovered && hoveredLang!='en-to-tr')} on:mouseenter={()=>{anyHovered=true; hoveredLang='en-to-tr'}} on:mouseleave={()=>{anyHovered=false;hoveredLang=''}} role='button' tabindex='-1'>
            <div class="imgwrap">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" alt="en-to-tr" />
            </div>
            <span>Turkish</span>
        </div>
        {#if selectedLang != '' && selectedLang != undefined && selectedLang != 'none'}
        <form class="register" name="register" in:slide={{duration:600}} out:slide 
        on:submit={async(e)=>{error = await register(e, username,email,password,null, selectedLang)}}>
            <h1>Create a <span>free</span> account<br>and 
                <span>
                    speak up
                    <img src="/logo.svg" style="height:4rem; width:auto; margin: 0 -0.5rem -0.5rem -0.5rem" alt="logo"/>
                </span>!
            </h1>
            <div class="group">
                <label for="username" class:filled={username!=''}>USERNAME</label>
                <input bind:value={username} type="text" style="padding-right: 11rem;" autocomplete="off"/>
            </div>
            <div class="group">
                <label for="email" class:filled={email!=''}>EMAIL</label>
                <input bind:value={email} type="email" style="padding-right: 7rem;" autocomplete="off"/>
            </div>
            <div class="group">
                <label for="password" class:filled={password!=''}>PASSWORD</label>
                <input bind:value={password} type="password"  style="padding-right: 11rem;" autocomplete="off"/>
            </div>
            <div class="group">
                <label for="confirmpassword" class:filled={confirmpassword!=''}>CONFIRM PASSWORD</label>
                <input bind:value={confirmpassword} type="password" style="padding-right: 18rem;" autocomplete="off"/>
            </div>
            {#if error}
                <div style="width:100%; margin: 1rem 0; text-align:center; color:var(--red); font-size:2rem;">{error}</div>
            {/if}
            <div class="buttons">
                <button type="submit">
                    REGISTER
                </button>
                <div class="anchors">
                    <a href="./authenticate/login">
                        Already have an account?
                    </a>
                    <a href="./authenticate/register">
                        Or pick a language later
                    </a>
                </div>
            </div>
        </form>
        {/if}
    </div>
</div>


<style>
    .anchors {
        display: flex;
        flex-direction: column;
        align-items: left;
        gap:0.5rem;
    }
    .buttons > button:first-child {
        pointer-events: auto;
        background-color: var(--fg-color-half);
        color: var(--bg-highlight);
        border: none;
        border-radius: 0.5rem;
        width: 12rem;
        height: 4rem;
        font-size: 1.6rem;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
    }
        .buttons > button:first-child:hover {
            transform: scale(1.05);
            box-shadow: 0 0.5rem 1rem 0.5rem #00000020;
            cursor: pointer;
            background-color: var(--fg-color);
            color:var(--bg-highlight);
        }
    .anchors > a {
        pointer-events: auto;
        color: var(--fg-color-2);
        font-size: 1.4rem;
        text-decoration: none;
        transition: all 0.2s ease-in-out;
    }
        .anchors > a:hover {
            color: var(--fg-color);
            cursor: pointer;
        }
    .buttons {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        width:70%;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .filled {
        color: var(--fg-color) !important;
    }
    .group {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 70%;
        position: relative;
        border-radius: 0.5rem;
        box-sizing: border-box;
        transition: transform 0.2s ease-in-out, opacity 0.4s ease-in-out;
        overflow: hidden;
    }
        .group:hover, .group:focus-within {
            transform: scale(1.03);
            box-shadow: 0 0 0.7rem 0.2rem var(--fg-color-half);
        }
        .register:hover > .group:not(:hover), .register:focus-within > .group:not(:focus-within) {
            transform: scale(0.975);
            opacity: 0.6;
        }
        .group > label {
            position: absolute;
            right:2%;
            top:50%;
            transform: translateY(-50%);
            font-size: 1.6rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color:var(--bg-highlight-2);
            transition: color 0.2s ease-in-out;
        }
        .group input, .group input:focus, .group input:active {
            background-color: var(--el-bg-color-half);
            outline:none;
            box-shadow: none !important;
            border:none;
            color: var(--fg-color);
            -webkit-box-shadow: none;
            box-sizing: border-box;
            width: 100%;
            height: 6rem;
            border-radius: 0.5rem !important;
            padding: 0 1rem;
            font-size: 2rem;
        }
    .register {
        pointer-events: none;
        width: 80rem;
        background-color: var(--el-bg-color-half);
        box-sizing: border-box;
        border-radius: 0.5rem;
        padding:4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:1rem;
    }
        .register > h1 {
            font-family: var(--font-important);
            font-size: 4rem;
            margin: 0 !important;
            text-align: left;
            width:70%;
        }
            .register > h1 > span {
                color: var(--selected-text);
            }
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
        height: 30rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 5rem;
        box-sizing: border-box;
    }
        .top h1 {
            font-size: 5rem;
            margin-left: 30rem;
            margin-bottom: 2rem;
        }
        .top a {
            font-size: 1.7rem;
            font-weight: normal;
            font-variant: small-caps;
            color: var(--fg-color-2);
            transition: all 0.1s ease-in-out;
            margin-left: 65rem;
        }
            .top a:hover {
                color:white;
                text-shadow: -1px 4px 7px var(--cyan-half) !important;
            }
    .cards {
        width: 100%;
        height:40rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
        gap:1rem;
    }
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:27rem;
        height:32rem;
        border-radius: 0.5rem;
        background-color: var(--el-bg-color-half);
        box-sizing: border-box;
        padding: 1.2rem 2rem;
        backdrop-filter:blur(12px);
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1rem 2.5rem 0.5rem #00000010;
        overflow: hidden;
    }
        .card h1 {
            font-size:2.2rem;
            height:40%;
            width:100%;
            font-family: var(--font-important);
        }
        .art {
            height:63%;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 2rem;
        background: radial-gradient(at bottom, var(--cyan-half) 0%, var(--bg-color) 100%);
    }
    @media (pointer: coarse) {
        .outwrap {
            width: 100vw !important;
            padding: 0.5rem !important;
            overflow-x: hidden !important;
            overflow-y: scroll !important;
        }
            .outwrap::-webkit-scrollbar {
                visibility: hidden !important;
                width: 0 !important;
            }
        .top {
            text-align: center !important;
            height: 80vh !important;
            padding-bottom: 0 !important;
        }
            .top h1 {
                margin-left: 0rem !important;
                font-size: 3.5rem !important;
            }
                .top > h1 > img {
                    height: 4rem !important;
                }
            .top a {
                margin-left: 0rem !important;
                font-size: 1.5rem !important;
            }
        .cards {
            flex-direction: column !important;
            align-items: center !important;
            height: fit-content;
        }
            .card {
                rotate: 0deg !important;
                width: 85vw;
                height: 120vw;
                margin-top: 0 !important;
            }
                .card:hover {
                    width: 95vw !important;
                }
        .offeredlangs {
            padding: 1rem;
        }
            .language {
                width: 90vw;
                height: 30vw;
                align-items: center;
                padding: 1.25rem;
            }
                .language > .imgwrap {
                    width:5.75rem;
                    height: 90%;
                }
                .language span {
                    font-size: 2rem;
                }
            .register {
                width: 95vw;
                padding: 2rem 2rem;
            }
                .register > h1 {
                    font-size: 2.3rem;
                    width: 100%;
                    margin-bottom: 1rem !important;
                }
                    .register > h1 > span > img {
                        height: 3rem !important;
                    }
                .register > .group {
                    width: 100%;
                    height: 5rem;
                }
                    .group > label {
                        height: 100%;
                        text-align: right;
                        width: 40%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        font-size: 1.2rem;
                        white-space: wrap;
                    }
                    .group > input {
                        padding-right: 42% !important;
                    }
            .buttons {
                flex-direction: column;
                width: 100%;
                padding: 0.25rem;
            }
                .buttons > button[type="submit"] {
                    width: 100%;
                    height: 4rem;
                    font-size: 1.6rem;
                }
                .anchors {
                    width: 100%;
                    margin-top: 0.5rem;
                    padding: 0.25rem;
                    height: 8rem;
                    flex-direction: column;
                    justify-content: space-around;
                }
                    .anchors > a {
                        font-size: 1.2rem;
                    }
    }
</style>