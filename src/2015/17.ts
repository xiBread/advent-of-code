import input from "$input/2015/17.txt";
import { solve } from "$lib";
import { sum } from "c8n";

const LITERS = 150;

function day17() {
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

solve("Day 17: No Such Thing as Too Much", day17, [4372, 4]);
