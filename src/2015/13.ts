import input from "$input/2015/13.txt";
import { register } from "$lib/aoc";

import { permutations } from "c8n";

export default function day13() {
	const seating = input.split("\n").map((line) => /(\w+).+?(\w+) (\d+).+?(\w+)\./.exec(line)!);
	const table: Record<string, Record<string, number>> = {};

	for (const [, guest, action, units, neighbor] of seating) {
		(table[guest] ??= {})[neighbor] = Number(units) * (action === "gain" ? 1 : -1);
	}

	function optimize() {
		let max = 0;

		for (const seating of permutations(Object.keys(table))) {
			let happiness = 0;

			for (let i = 0; i < seating.length; i++) {
				const a = seating[i];
				const b = seating[(i + 1) % seating.length];

				happiness += table[a][b] + table[b][a];
			}

			max = Math.max(max, happiness);
		}

		return max;
	}

	const others = optimize();

	for (const guest of Object.keys(table)) {
		table[guest].me = (table.me ??= {})[guest] = 0;
	}

	return [others, optimize()];
}

register(day13, "Knights of the Dinner Table", [618, 601]);
