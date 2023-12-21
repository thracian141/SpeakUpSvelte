<script lang="ts">
  import { fade } from "svelte/transition";

    let src = "https://scontent-sof1-2.xx.fbcdn.net/v/t39.30808-6/357485541_6832060806826430_2842325194166617258_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=S7eDGNgYEQgAX-5ctHK&_nc_ht=scontent-sof1-2.xx&oh=00_AfDhUkkZ0AjW5UnPfpft-a8bdafv3KNi1JjW_CFSPCWhzQ&oe=65885E43"
    let username = "Shefa"
    let displayname = "John Doe"
    let email = "email@gmail.com"
    let password = "password1234"
    let accountCreatedDate = "12.09.2013"
    
    let hoverPfp = false;
</script>

<div class="wrap">
    <div class="panel">
        <div class="fields">
            <div class="top-row">
                <div class="pfp-wrap">
                    <img {src} alt="pfp" class="pfp" />
                    <div class="pfp-overlay">Change photo?</div>
                </div>
                <div class="username-and-date">
                    <h1 style="margin:0; margin-bottom:0.5rem;">{username}</h1>
                    <div style="display: flex;flex-direction:row;align-items:center; text-align:center">
                        <img src="/icons/calendar-event.svg" alt="account created"/>
                        <div style="display: flex;flex-direction:column; width:10rem; align-items:flex-start">
                            <span style="font-weight: bold; font-size:0.85rem; padding-left:0.2rem">ACCOUNT CREATED</span>
                            <span style="font-size: 1.5rem;">{accountCreatedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel">

    </div>
</div>

<style>
    .username-and-date {
        display: flex;
        flex-direction: column;
        position: absolute;
        left:120%;
        top:20%;
    }
        .username-and-date > div > img {
            filter: brightness(0) saturate(100%) invert(92%) sepia(3%) saturate(1186%) hue-rotate(193deg) brightness(84%) contrast(88%);
            height:3rem;
            font-size: 1.2rem;
            margin-right: 1rem;
        }
    .fields {
        position: relative;
        background-color: var(--bg-color);
        border-radius: 0.7rem;
        width:100%;
        height:85%;
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
    }
    .top-row {
        position: absolute;
        top:0%;
        transform: translateY(-50%);
        display: flex;
        box-sizing: border-box;
        flex-direction: row;
        align-items: top;
        gap:2rem;
    }
    .pfp-wrap {
        width:10rem;
        height:10rem;
        border-radius: 100%;
        display: flex;
        overflow: hidden;
        outline: 0.5rem solid var(--bg-color);
    }
    .pfp {
        object-fit:fill;
    }
    .pfp-overlay {
        background-color: #000000;
    }
    .panel {
        background-color: var(--el-bg-color);
        width:35rem;
        height:42rem;
        border-radius: 0.7rem;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .wrap {
        border-radius: 1rem;
        padding: 1rem;
        display: flex;
        min-width: 50vw;
        max-width: 70vw;
        flex-direction: row;
        flex-wrap:wrap;
        gap:1rem;
        justify-content: center;
        align-items: center;
    }
</style>