<i class="bi bi-arrow-clockwise rotating"></i>

<style>
    .rotating {
        height:70px;
        width:80px;
        display:flex;
        align-items: center;
        justify-content: center;
        padding-top:10px;
        box-sizing: border-box;
        padding:0;
        font-size: 5rem;
        animation: rotate 1s linear infinite;
        transform-origin:center;
    }
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
</style>