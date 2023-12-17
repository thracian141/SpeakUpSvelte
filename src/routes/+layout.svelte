<script lang='ts'>
    import Navbar from "./Navbar.svelte";
    import './styles.css';
</script>

<div class="app">
    <Navbar />
    <main>
        <slot />
    </main>
</div>

<style>
    .app {
		display: flex;
		flex-direction: row;
		min-height: 100vh;
        box-sizing: border-box;
	}

    main {
        flex-grow: 1;
		display: flex;
		flex-direction: column;
        padding:5rem;
        padding-top: 2rem;
        padding-bottom:3rem;
		box-sizing: border-box;
        flex-grow: 1;
	}
</style>