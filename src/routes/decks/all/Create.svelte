<script lang="ts">
	import { slide } from 'svelte/transition';
    let imageUrl = '';

    function handleFileUpload(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                imageUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    let deckName = '';
    let deckDescription = '';

    let isRotating = false;

    function rotateIcon() {
        isRotating = true;
        setTimeout(() => {
            isRotating = false;
        }, 500); // Duration of the rotation animation
    }
</script>

<h1 transition:slide>Create a personal deck</h1>
<form enctype="multipart/form-data" transition:slide>
    <div class="inner-wrap">
        <div class="img-wrap">
            <label for="image" class="custom-file-input">
                {#if imageUrl}
                    <span>Change</span>
                    <img src={imageUrl} alt="Uploaded" style="width: 100%; height: 100%; object-fit: cover;" />
                {:else}
                    +
                {/if}
            </label>
            <input id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
        </div>
        <div class="fields-wrap">
            <div class="field-group">
                <label for="name" style="{deckName != '' ? "top:0%;opacity: 0.75;font-size: 1rem;" : ""}">Deck name</label>
                <input id="name" type="text" name="name" bind:value={deckName}>
            </div>
            <div class="field-group" style="margin-top: 1rem;">
                <label for="description" style="{deckDescription!='' ? 'top:-8%;opacity: 0.75;font-size: 1rem;' : ""}">
                    {deckDescription!='' ? "Description" : "Description..."}
                </label>
                <textarea id="description" name="description" bind:value={deckDescription}></textarea>
            </div>
        </div>
    </div>
    <div class="buttons">
        <button type="submit">Create</button>
        <button type="reset" on:click={rotateIcon}>
            <div class="{isRotating ? 'rotate' : ''}">
                <i class="bi bi-arrow-counterclockwise"></i>
            </div>
        </button>
    </div>
</form>

<style>
    .rotate {
        animation: rotate 1s linear;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    button[type="reset"] {
        width:3rem;
        height:3rem;
        border-radius: 0.5rem;
        background-color: var(--red);
        border: none;
        color: var(--fg-color);
        font-size: 1.2rem;
        cursor: pointer;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap:1rem;
    }
    form > .inner-wrap {
        gap:2rem;
    }
    button[type="submit"] {
        width:15rem;
        height:3rem;
        border-radius: 0.5rem;
        background-color: var(--fg-color);
        border: none;
        color: var(--el-bg-color);
        font-size: 1.2rem;
        cursor: pointer;
    }
    textarea, textarea:focus, textarea:active, textarea:hover { 
        resize: none;
        width: 20rem;
        height: 10.25rem;
        background-color: var(--bg-color) !important;
        color: var(--fg-color) !important;
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box !important;
        box-shadow: none !important;
        outline: none !important;
        -webkit-box-shadow: none !important;
        -webkit-border: none !important;
        -moz-box-shadow: none !important;
        -moz-border: none !important;
        border:1px solid var(--bg-highlight) !important;
        font-size: 1.3rem;
    }
        label[for="description"] {
            font-size: 1.1rem;
            margin-left:0.5rem;
            position: absolute;
            top:0.5rem;
            opacity: 1;
            transition: top 0.2s ease-in-out, opacity 0.3s ease-in-out, font-size 0.12s ease-in-out;
        }
            .field-group:focus-within > label[for="description"] {
                top:-8%;
                opacity: 0.75;
                font-size: 1rem;
            }
    .field-group {
        position: relative;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.25rem;
    }
    input[type="text"], input[type="text"]:focus, input[type="text"]:active, input[type="text"]:hover {
        background-color: var(--bg-color) !important;
        color: var(--fg-color) !important;
        border-radius: 0.5rem;
        padding: 0.5rem;
        box-sizing: border-box !important;
        border:none !important;
        box-shadow: none !important;
        outline: none !important;
        -webkit-box-shadow: none !important;
        -webkit-border: none !important;
        -moz-box-shadow: none !important;
        -moz-border: none !important;
        border: 1px solid var(--bg-highlight) !important;
        height:3.5rem;
        font-size: 1.5rem;
    }
        label[for="name"] {
            position: absolute;
            z-index: 1;
            top:50%;
            margin-left:0.5rem;
            transform: translateY(-50%);
            opacity: 1;
            font-size: 1.1rem;
            transition: top 0.2s ease-in-out, opacity 0.3s ease-in-out;
            color: var(--fg-color);
        }
            .field-group:focus-within > label[for="name"] {
                top:0%;
                opacity: 0.75;
                font-size: 1rem;
            }
        label > span {
            position: absolute;
            top: 50%;
            left: 50%;
            opacity: 0;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            transition: opacity 0.2s ease-in-out;
        }
        label > img {
            opacity:1;
            transition: opacity 0.2s ease-in-out;
        }
        .img-wrap:hover > label > img {
            opacity: 0.5;
        }
        .img-wrap:hover > label > span {
            opacity: 1;
        }
    .inner-wrap {
        display: flex;
        flex-direction: row;
    }
    .fields-wrap {
        display: flex;
        flex-direction: column;
    }
    .custom-file-input {
        display: block;
        width: 15rem; 
        height: 15rem;
        border: 1px solid var(--fg-color);
        border-radius: 1rem;
        cursor: pointer;
        line-height: 15rem;
        text-align: center;
        font-size: 3rem;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: border 0.12s ease-in-out;
    }
        .img-wrap:hover > .custom-file-input {
            border: 1px solid var(--bg-highlight);
        }
        .img-wrap:hover > label {
            color: var(--bg-highlight);
        }
    .img-wrap {
        display: flex;
        flex-direction: column;
    }
        .img-wrap > label {
            transition: color 0.1s ease-in-out;
        }
    form {
        display: flex;
        flex-direction: column;
    }
</style>