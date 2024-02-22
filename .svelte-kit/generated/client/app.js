export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/account": [3],
		"/authenticate/login": [4],
		"/authenticate/register": [5],
		"/create": [6],
		"/create/course": [7],
		"/create/course/[course]": [8],
		"/create/course/[course]/[section]": [9],
		"/create/deck": [10],
		"/create/deck/cards": [11],
		"/decks": [12],
		"/decks/all": [13],
		"/decks/[language]": [14],
		"/learn": [15],
		"/welcome": [16]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';