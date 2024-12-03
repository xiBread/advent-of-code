import input from "$input/2017/24.txt";
import { register } from "$lib/aoc";

export default function day24() {
	const components = input.split("\n").map((line) => {
		const [a, b] = line.split("/").map(Number);
		return { a, b, used: false };
	});

	let strongest = -Infinity;
	const strengths: number[] = [];

	function build(port = 0, strength = 0, length = 0) {
		let found = false;

		for (const cmp of components) {
			if (cmp.used) continue;

			if (cmp.a === port || cmp.b === port) {
				found = true;

				cmp.used = true;
				build(port === cmp.a ? cmp.b : cmp.a, strength + cmp.a + cmp.b, length + 1);
				cmp.used = false;
			}
		}

		if (!found) {
			strongest = Math.max(strongest, strength);

			while (strengths.length <= length) {
				strengths.push(0);
			}

			strengths[length] = Math.max(strengths[length], strength);
		}
	}

	build();

	return [strongest, strengths.at(-1)!];
}

register(day24, "Electromagnetic Moat", [1695, 1673]);
