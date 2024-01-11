<script lang="ts">
    let sections: string[] = ['Intro', 'Basic Grammar', 'Vocabulary', 'Advanced Grammar', 'Advanced Vocabulary', 'Phrases'];
    let selectedSection: string = '';
    let selectedLanguage: string = '';

</script>


<div class="outwrap">
    <h1 style="margin-bottom: 2rem !important;">Pick a language to edit</h1>
    <div class="panels">
        <div class="languages">
            <div class="language" on:click={()=>selectedLanguage='en'} on:keydown={()=>selectedLanguage='en'} class:selected={selectedLanguage='en'} role="button" tabindex="0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png" alt="english"/>
                <span>Edit the <span>English</span> course</span>
            </div>
            <div class="language" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/1920px-Flag_of_Bulgaria.svg.png" alt="english"/>
                <span>Edit the <span>Bulgarian</span> course</span>
            </div>
            <div class="language">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" alt="english"/>
                <span>Edit the <span>Turkish</span> course</span>
            </div>
            <div class="language">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1920px-Flag_of_Germany.svg.png" alt="english"/>
                <span>Edit the <span>German</span> course</span>
            </div>
            <div class="language">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/1920px-Flag_of_Italy.svg.png" alt="english"/>
                <span>Edit the <span>Italian</span> course</span>
            </div>
        </div>
        <div class="sections">
            <h2>Select section</h2>
            <select>
                {#each sections as section}
                <option>{section}</option>
                {/each}
            </select>
        </div>
    </div>
</div>


<style>
    .sections > select {
        width: 100%;
        height: 4rem;
        background-color: var(--el-bg-color);
        color: var(--fg-color);
        border-radius: 0.5rem;
        padding: 1rem;
        box-sizing: border-box;
        font-size: 1.5rem;
        margin-top: 1rem;
    }
        .sections > h2 {
            margin: 0 !important;
        }
    .sections {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color);
        border-radius: 0.75rem;
        padding: 1rem;
        box-sizing: border-box;
    }
    .languages {
        pointer-events: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }
        .languages:hover > .language:not(:hover) {
            background-color: var(--el-bg-color-half);
        }
        .language {
            pointer-events: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 95%;
            height: 20%;
            background-color: var(--el-bg-color);
            border-radius: 0.75rem;
            padding: 1rem;
            box-sizing: border-box;
            margin-bottom: 1rem;
            transition: background-color 0.3s ease-in-out, box-shadow 0.1s ease-in-out;
        }
            .language:hover {
                cursor: pointer;
                background-color: var(--el-bg-color);
                box-shadow: 0 0 5px 1px var(--bg-highlight);
            }
            .language span {
                font-size: 1.5rem;
            }
                .language span span {
                    font-weight: bold;
                    color: var(--cyan);
                }
            .language img {
                width: 5rem;
                height: 3.5rem;
                box-sizing: border-box;
                border-radius: 0.25rem;
                image-rendering: optimizeQuality;
                object-fit: cover;
                margin-right: 2rem;
            }
    .panels {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--bg-color);
        border-radius: 0.75rem;
    }
    .outwrap {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 70rem;
        height: 45rem;
        background-color: var(--el-bg-color);
        border-radius: 1rem;
        padding:3rem;
    }
    .outwrap h1 {
        margin: 0 !important;
    }
</style>