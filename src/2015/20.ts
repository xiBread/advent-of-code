import input from "$input/2015/20.txt";
import { register } from "$lib/aoc";

export default function day20() {
	const presents = Number(input);
	const max = presents / 10;

	const infinite = Uint32Array.from({ length: max });
	const limited = Uint32Array.from(infinite);

	for (let i = 1; i < max; i++) {
		let visits = 0;

		for (let j = i; j < max; j += i) {
			infinite[j] += i * 10;

			if (visits < 50) {
				limited[j] += i * 11;
				visits++;
			}
		}
	}

	function min(houses: Uint32Array) {
		for (let i = 0; i < houses.length; i++) {
			if (houses[i] >= presents) return i;
		}

		return -1;
	}

	return [min(infinite), min(limited)];
}

register(day20, "Infinite Elves and Infinite Houses", [665_280, 705_600]);
