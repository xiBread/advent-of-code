import input from "$input/2017/09.txt";
import { solve } from "$lib";

import { sum } from "c8n";

function day09() {
	const stream = input.replace(/!./g, "");

	let total = 0;
	let score = 0;

	for (const char of stream.replace(/<.*?>/g, "")) {
		if (char === "}") {
			total += score--;
		} else {
			score += char === "{" ? 1 : 0;
		}
	}

	return [
		total,
		// -2 per pair of chevrons
		sum(stream.match(/<.*?>/g)!.map((match) => match.length - 2)),
	];
}

solve("Day 9: Stream Processing", day09, [14_190, 7053]);
