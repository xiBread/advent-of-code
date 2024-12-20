import input from "$input/2016/11.txt";
import { register } from "$lib/aoc";

import { sum } from "c8n";

export default function day11() {
	const parts = input.split("\n").map((line) => line.match(/\ba\b/g)?.length ?? 0);

	function move(parts: number[]) {
		let steps = 0;

		for (let i = 1; i < 4; i++) {
			steps += 2 * sum(parts.slice(0, i)) - 3;
		}

		return steps;
	}

	return [move(parts), move([parts[0] + 4, ...parts.slice(1)])];
}

register(day11, "Radioisotope Thermoelectric Generators", [47, 71]);
