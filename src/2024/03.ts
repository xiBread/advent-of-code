import input from "$input/2024/03.txt";
import { register } from "$lib/aoc";

export default function day03() {
	const matches = input.matchAll(/mul\((\d+),(\d+)\)|(do(?:n't)?)/g) ?? [];

	let sum = 0;
	let enabledSum = 0;

	let enabled = true;

	for (const match of matches) {
		const product = Number(match[1]) * Number(match[2]);

		if (!match[3]) {
			sum += product;
		}

		if (match[0] === "do") {
			enabled = true;
		} else if (match[0] === "don't") {
			enabled = false;
		} else if (enabled) {
			enabledSum += product;
		}
	}

	return [sum, enabledSum];
}

register(day03, "Mull It Over", [184_576_302, 118_173_507]);
