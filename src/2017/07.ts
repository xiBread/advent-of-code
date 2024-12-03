import input from "$input/2017/07.txt";
import { register } from "$lib/aoc";

import { groupBy } from "c8n";

interface Program {
	weight: number;
	children: string[];
}

export default function day07() {
	const list = input.split("\n").map((line) => /(\w+) .(\d+)(?:.+> (.+))?/.exec(line)!);
	const programs = new Map<string, Program>();

	for (const program of list) {
		programs.set(program[1], {
			weight: Number(program[2]),
			children: program[3]?.split(", ") ?? [],
		});
	}

	const names = new Set(programs.keys());
	const children = new Set<string>();

	for (const program of programs.values()) {
		program.children.forEach((child) => children.add(child));
	}

	let bottom = "";

	for (const name of names) {
		if (!children.has(name)) bottom = name;
	}

	function totalWeight(node: string): number {
		const program = programs.get(node);
		if (!program) return 0;

		return program.children.reduce((sum, c) => sum + totalWeight(c), 0) + program.weight;
	}

	let program = programs.get(bottom)!;

	let balanced = false;
	let target = 0;
	let incorrect = "";

	while (!balanced) {
		const weights = groupBy(program.children, totalWeight);
		balanced = weights.size === 1;

		if (!balanced) {
			const entries = weights
				.entries()
				.toArray()
				.sort((a, b) => a[1].length - b[1].length);

			target = entries.pop()![0];
			incorrect = entries[0][1][0];

			program = programs.get(incorrect)!;
		}
	}

	return [bottom, program.weight + (target - totalWeight(incorrect))];
}

register(day07, "Recursive Circus", ["rqwgj", 333]);
