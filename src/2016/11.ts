import input from "$input/2016/11.txt";
import { solve } from "$lib";

import { sum } from "c8n";

function day11() {
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

solve("Day 11: Radioisotope Thermoelectric Generators", day11, [47, 71]);
