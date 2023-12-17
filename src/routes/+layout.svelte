<script lang='ts'>
    import { onMount } from "svelte";
    import Navbar from "./Navbar.svelte";
    import './styles.css';

    let x = 0;
    let y = 0;
    let lastX = 0;
    let lastY = 0;

    onMount(() => {
        const mouseDiv = document.querySelector('#mouse-div');
        document.addEventListener('mousemove', (e) => {
            x = e.clientX;
            y = e.clientY;
            const speedX = Math.abs(x - lastX);
            const speedY = Math.abs(y - lastY);
            const width = window.innerWidth * 0.2 + speedX / 5;
            const height = window.innerHeight * 0.2 + speedY / 5;
            (mouseDiv as HTMLElement).style.left = `${x - width / 2}px`;
            (mouseDiv as HTMLElement).style.top = `${y - height / 2}px`;
            (mouseDiv as HTMLElement).style.width = `${width}px`;
            (mouseDiv as HTMLElement).style.height = `${height}px`;
            lastX = x;
            lastY = y;
        });
    });

</script>

<div class="app">
    <div id="bgcontainer">
        <div id="bg3"></div>
        <div id="bg1"></div>
        <div id="bg2"></div>
        <div id="bg4"></div>
        <div id="mouse-div"></div>
    </div>
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
        position: relative;
        background-color: var(--bg-color);
        overflow: hidden;
	}

    main {
        z-index: 1;
        flex-grow: 1;
		display: flex;
		flex-direction: column;
        padding:5rem;
        padding-top: 2rem;
        padding-bottom:3rem;
		box-sizing: border-box;
        flex-grow: 1;
        background-color: #00000000;
	}
    #mouse-div {
        z-index: 0;
        position: absolute;
        width: 20%;
        height: 20%;
        background-color: #eaf7ff10;
        border-radius: 50%;
        pointer-events: none;
        transition: top 0.5s cubic-bezier(0.02, 0.01, 0.21, 1), 
                    left 0.5s cubic-bezier(0.02, 0.01, 0.21, 1),
                    width 1s cubic-bezier(0.02, 0.01, 0.21, 1),
                    height 1s cubic-bezier(0.02, 0.01, 0.21, 1);
        filter: blur(200px);
    }
    
    #bgcontainer {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
    }
    #bgcontainer:after {
        position: absolute;
        content: "";
        height: 100%;
        width: 100%;
        backdrop-filter: blur(120px);
    }
    #bg1 {
        z-index: 0;
        background-color: #17191c;
        position: absolute;
        width: 50%;
        height: 100%;
        border-radius: 40%;
    }
    #bg2 {
        z-index: 0;
        background-color: #101215;
        position: absolute;
        top:-30%;
        left:-30%;
        width: 70%;
        height: 70%;
        border-radius: 40%;
        rotate: 40deg;
    }
    #bg3 {
        z-index: 0;
        background-color: #17191d;
        position: absolute;
        bottom:-30%;
        right:-10%;
        width: 70%;
        height: 70%;
        border-radius: 40%;
    }
    #bg4 {
        z-index: 0;
        background-color: #0a0c0d;
        position: absolute;
        top:-20%;
        right:-20%;
        width:80%;
        height:20%;
        border-radius: 40%;
    }
</style>