import input from "$input/2017/09.txt";
import { register } from "$lib/aoc";

import { sum } from "c8n";

export default function day09() {
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

register(day09, "Stream Processing", [14_190, 7053]);
