<script lang="ts">
    let src = "https://scontent-sof1-2.xx.fbcdn.net/v/t39.30808-6/357485541_6832060806826430_2842325194166617258_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=S7eDGNgYEQgAX-5ctHK&_nc_ht=scontent-sof1-2.xx&oh=00_AfDhUkkZ0AjW5UnPfpft-a8bdafv3KNi1JjW_CFSPCWhzQ&oe=65885E43"
    let username = ""
    let displayname = "John Doe"
    let email = "email@gmail.com"
    let password = "password1234"
    
    let hoverPfp = false;
</script>

<div class="wrapper">
    <div class="inner-wrap left">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="pfp-wrap" on:mouseenter={()=>hoverPfp = true} on:mouseleave={()=> hoverPfp = false} on:click={()=>alert("You've been banned for trying to change the default PFP.")}>
            <div class="shadow"></div>
            <span style="opacity: {hoverPfp ? "1" : "0"}">Change photo?</span>
            <img {src} alt="profile" class="pfp"/>
        </div>
        <div class="fields-wrap">
            <div class="form-section">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" bind:value={username} autocomplete="off"/>
            </div>
            <div class="form-section">
                <label for="displayname">Display name</label>
                <input type="text" id="displayname" name="displayname" bind:value={displayname} autocomplete="off"/>
            </div>
            <div class="form-section">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" bind:value={email} autocomplete="off"/>
            </div>
            <div class="form-section">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" bind:value={password} autocomplete="off"/>
            </div>   
        </div>
    </div>
    <div class="inner-wrap right">
        
    </div>
</div>


<style>
    .form-section {
        background-color: var(--bg-color);
        color:var(--fg-color);
        display: flex;
        flex-direction: column;
        height:4.5rem;
        position: relative;
        align-items: center;
        border-radius: 0.6rem !important;
        overflow: hidden;
        border-bottom: 1px solid var(--bg-color);
        border-top: 1px solid var(--bg-color);
    }
        .form-section > label {
            position: absolute;
            top: 7%;
            left:4%;
            transform: translateY(0%);
            font-size: 0.9rem;
            font-weight: bold;
            color: var(--fg-color);
        }
        .form-section > input {
            width:100%;
            height:100%;
            background-color: var(--el-bg-color);
            color: #00000000;
            outline: none;
            border: none;
            padding-left:2rem;
            padding-top: 1.5rem;
            font-size: 1.5rem;
            border-radius: 0.6rem !important;
            transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
        }
        .form-section > input:active, .form-section > input:focus {
            background-color: var(--bg-color) !important;
            -webkit-box-shadow: 0 0 0px 1000px var(--bg-color) inset !important;
            box-shadow: 0 0 0px 1000px var(--bg-color) inset !important;
        }
        .form-section > input::-webkit-autofill {
            outline: none;
            border: none;
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        .form-section > input, .form-section > input::placeholder, .form-section > input::-webkit-input-placeholder {
            color: var(--fg-color) !important;
        }
        .form-section > input::-webkit-autofill {
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
        }

    .fields-wrap {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width:100%;
        height:60%;
        background-color: var(--el-bg-color);
        justify-self: flex-end;
        border-radius: 0.6rem;
        overflow: hidden;
        padding:1rem;
        box-sizing: border-box;
    }
    .pfp-wrap {
        height: 14rem;
        width: 14rem;
        position: relative;
        display: flex;
        border-radius: 2rem;
        outline: 11px solid var(--el-bg-color);
        justify-content: center;
    }
        .pfp-wrap > span {
            color: var(--fg-color);
            position: absolute;
            z-index: 13;
            top:40%;
            text-align: center;
            transition: opacity 0.2s ease-in-out;
        }
        .pfp-wrap:hover {
            cursor: pointer;
        }
        .pfp-wrap:hover .shadow {
            box-shadow: 0 0 10rem 10rem inset #00000090;
            content: "Change photo?";
        }
    .shadow {
        border-radius: 2rem;
        height: 14rem;
        width: 14rem;
        position: absolute;
        left: 50%; 
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 1rem 0.5rem inset #00000080;
        z-index: 12;
        outline: 9px solid var(--bg-middle);
        transition: box-shadow 0.2s ease-in-out;
    }
    .pfp {
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        object-fit: contain;
        z-index: 0;
    }
    .wrapper {
        display: flex;
        flex-direction: row;
        flex-flow: row;
        border-radius: 1rem;
        background-color: var(--el-bg-color);
        min-height:40rem;
        min-width:60rem;
        padding: 1.5rem;
        gap:1rem;
    }
    .inner-wrap {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        align-items: center;
        width:50%;
        background-color: var(--bg-color);
        border-radius: 0.6rem;
        justify-content: space-between;
    }
</style>