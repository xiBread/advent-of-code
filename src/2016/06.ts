import input from "$input/2016/06.txt";
import { register } from "$lib/aoc";

import { zip } from "c8n";

export default function day06() {
	const message = input.split("\n").map((line) => [...line]);

	let corrected = "";
	let original = "";

	for (const column of zip(...message)) {
		const frequencies: Record<string, number> = {};

		for (const char of column) {
			frequencies[char] = (frequencies[char] ?? 0) + 1;
		}

		const sorted = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);

		corrected += sorted[0][0];
		original += sorted.at(-1)![0];
	}

	return [corrected, original];
}

register(day06, "Signals and Noise", ["liwvqppc", "caqfbzlh"]);
