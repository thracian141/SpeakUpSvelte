import { browser } from '$app/environment';
import { readable } from 'svelte/store';

function createIsNarrowScreen() {
    let set: (value: boolean) => void;
    const store = readable(browser ? window.innerWidth <= window.innerHeight : false, function start(_set) {
        set = _set;
        if (browser) {
            const update = () => set(window.innerWidth <= window.innerHeight);
            window.addEventListener('resize', update);
            return function stop() {
                window.removeEventListener('resize', update);
            };
        }
    });
    return store;
}

export const isNarrowScreen = createIsNarrowScreen();