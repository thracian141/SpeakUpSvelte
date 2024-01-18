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
</script>

<h1 transition:slide>Create a personal deck</h1>
<form enctype="multipart/form-data" transition:slide>
    <div class="inner-wrap">
        <div class="img-wrap">
            <label for="image" class="custom-file-input">
                {#if imageUrl}
                    <img src={imageUrl} alt="Uploaded" style="width: 100%; height: 100%; object-fit: cover;" />
                {:else}
                    +
                {/if}
            </label>
            <input id="image" type="file" name="image" accept="image/*" style="display: none;" on:change={handleFileUpload} />
        </div>
        <div class="fields-wrap">
            <label for="name">Name</label>
            <input id="name" type="text" name="name" />
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
        </div>
    </div>
    <button type="submit">Create</button>
</form>

<style>
    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--fg-color);
        background-color: var(--bg-color);
        color: var(--fg-color);
        cursor: pointer;
    }
    button:hover {
        background-color: var(--fg-color);
        color: var(--bg-color);
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
    }
    .img-wrap {
        display: flex;
        flex-direction: column;
    }
    form {
        display: flex;
        flex-direction: column;
    }
</style>