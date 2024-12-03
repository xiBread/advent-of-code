import input from "$input/2017/15.txt";
import { solve } from "$lib";

const GEN_A_FACTOR = 16_807;
const GEN_B_FACTOR = 48_271;
const DIVISOR = 2_147_483_647;

function day15() {
	const [a, b] = input.match(/\d+/g)!.map(Number);

	function* generate(value: number, factor: number, multiple = 1) {
		while (true) {
			value = (value * factor) % DIVISOR;

			if (value % multiple === 0) {
				yield value & 0xffff;
			}
		}
	}

	function matches(pairs: number, a: number, b: number, ma = 1, mb = 1) {
		const genA = generate(a, GEN_A_FACTOR, ma);
		const genB = generate(b, GEN_B_FACTOR, mb);

		let matches = 0;

		for (let i = 0; i < pairs; i++) {
			if (genA.next().value === genB.next().value) {
				matches++;
			}
		}

		return matches;
	}

	return [matches(40_000_000, a, b), matches(5_000_000, a, b, 4, 8)];
}

solve("Day 15: Dueling Generators", day15, [577, 316]);
