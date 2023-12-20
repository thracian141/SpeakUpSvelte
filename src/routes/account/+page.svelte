<script lang="ts">
    let src = "https://scontent-sof1-2.xx.fbcdn.net/v/t39.30808-6/357485541_6832060806826430_2842325194166617258_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=S7eDGNgYEQgAX-5ctHK&_nc_ht=scontent-sof1-2.xx&oh=00_AfDhUkkZ0AjW5UnPfpft-a8bdafv3KNi1JjW_CFSPCWhzQ&oe=65885E43"
    let hoverPfp = false;
</script>

<div class="wrapper">
    <div class="inner-wrap left">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="pfp-wrap" on:mouseenter={()=>hoverPfp = true} on:mouseleave={()=> hoverPfp = false} on:click={()=>alert("You've been banned for trying to change the default PFP.")}>
            <div class="shadow"></div>
            <span style="opacity: {hoverPfp ? "1" : "0"}">Change photo?</span>
            <img {src} alt="profile" class="pfp"/>
        </div>
        <div class="fields-wrap">
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" value="Username" disabled/>
            </div>
        </div>
    </div>
    <div class="inner-wrap right">
        
    </div>
</div>


<style>
    .fields-wrap {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width:100%;
        height:60%;
        background-color: var(--el-bg-color);
        justify-self: flex-end;
        border-radius: 0.6rem;
    }
    .pfp-wrap {
        height: 14rem;
        width: 14rem;
        position: relative;
        display: flex;
        border-radius: 2rem;
        outline: 0.8rem solid var(--bg-highlight);
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
        outline: 0.75rem solid var(--el-bg-color);
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