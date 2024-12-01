import input from "$input/2015/08.txt";
import { solve } from "$lib";

import { sum } from "c8n";

function day08() {
	const strings = input.split("\n");

	return [
		sum(strings.map((str) => str.length - eval(str).length)),
		// +2 because we need to add `\` for each quote pair and double escape
		// any existing backslashes
		sum(strings.map((str) => str.match(/[\\"]/g)!.length + 2)),
	];
}

solve("Day 8: Matchsticks", day08, [1342, 2074]);
