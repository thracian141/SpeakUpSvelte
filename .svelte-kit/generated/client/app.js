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
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
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
		"/create/course/[course]/[section]/[card]": [10],
		"/create/deck": [11],
		"/create/deck/[deckid]": [12],
		"/decks": [13],
		"/decks/all": [14],
		"/decks/[language]": [15],
		"/learn": [16],
		"/learn/course": [17],
		"/learn/deck": [18],
		"/welcome": [19]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';