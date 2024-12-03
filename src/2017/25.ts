import input from "$input/2017/25.txt";
import { solve } from "$lib";

type State = "A" | "B" | "C" | "D" | "E" | "F";
type Rule = [write: number, move: boolean, state: State];

function day25() {
	const [instructions, ...blueprint] = input.split("\n\n");

	const steps = Number(instructions.match(/\d+/)![0]);
	const tape: Record<number, number> = {};

	const rules = blueprint.reduce(
		(rules, rule) => {
			const matches = rule.match(/\b(?:([lr]).+?)?(.)(?=[:.])/g)!;

			return {
				...rules,
				[matches[0]]: [
					[Number(matches[2]), matches[3] === "right", matches[4]],
					[Number(matches[6]), matches[7] === "right", matches[8]],
				],
			};
		},
		{} as Record<State, Rule[]>,
	);

	let cursor = 0;
	let state: State = "A";

	for (let i = 0; i < steps; i++) {
		const value = tape[cursor] ?? 0;
		const [write, move, next]: Rule = rules[state][value];

		tape[cursor] = write;
		cursor += move ? 1 : -1;
		state = next;
	}

	return Object.values(tape).reduce((a, b) => a + b);
}

solve("Day 25: The Halting Problem", day25, 2474);
