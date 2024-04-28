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
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/account": [3],
		"/adminpanel": [4],
		"/authenticate/login": [5],
		"/authenticate/register": [6],
		"/bugs": [7],
		"/create": [8],
		"/create/course": [9],
		"/create/course/[course]": [10],
		"/create/course/[course]/[section]": [11],
		"/create/course/[course]/[section]/[card]": [12],
		"/create/deck": [13],
		"/create/deck/[deckid]": [14],
		"/decks": [15],
		"/decks/all": [16],
		"/decks/[language]": [17],
		"/learn": [18],
		"/learn/course": [19],
		"/learn/course/nocontent": [20],
		"/learn/deck": [21],
		"/learn/deck/nocontent": [22],
		"/welcome": [23]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';