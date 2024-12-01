import input from "$input/2015/05.txt";
import { solve } from "$lib";

import { count } from "c8n";

function day05() {
	const strings = input.split("\n");

	const vowels = /(?:[aeiou].*){3,}/;
	const repeat = /(.)\1/;
	const reject = /ab|cd|pq|xy/;

	const pair = /(..).*\1/;
	const sandwich = /(.).\1/;

	return [
		count(strings, (str) => vowels.test(str) && repeat.test(str) && !reject.test(str)),
		count(strings, (str) => pair.test(str) && sandwich.test(str)),
	];
}

solve("Day 5: Doesn't He Have Intern-Elves For This?", day05, [236, 51]);
