import input from "$input/2015/17.txt";
import { register } from "$lib/aoc";
import { sum } from "c8n";

const LITERS = 150;

export default function day17() {
	const sizes = input.split("\n").map(Number);
	const containers: Record<string, number> = {};

	for (let i = 1; i < 1 << sizes.length; i++) {
		const liters = sizes.filter((_, j) => (i & (1 << j)) > 0);

		if (sum(liters) === LITERS) {
			containers[liters.length] = (containers[liters.length] ??= 0) + 1;
		}
	}

	return [sum(Object.values(containers)), containers[Object.keys(containers)[0]]];
}

register(day17, "No Such Thing as Too Much", [4372, 4]);
