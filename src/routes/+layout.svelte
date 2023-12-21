<script lang='ts'>
    import Navbar from "./Navbar.svelte";
    import './styles.css';
</script>

<div class="app">
    <Navbar />
    <main>
        <div class="wrap">
            <slot />
        </div>
    </main>
</div>

<style>
    .app {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
        box-sizing: border-box;
        position: relative;
        background-color: var(--bg-color);
        overflow: hidden;
	}
    main {
        position: relative;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
        flex-grow: 1;
        background-color: #00000000;
        padding-left: 5.5rem;
	}
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 1rem;
    }
</style>