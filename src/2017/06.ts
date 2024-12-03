import input from "$input/2017/06.txt";
import { register } from "$lib/aoc";

export default function day06() {
	const banks = input.split(/\s+/).map(Number);
	const seen: Record<string, number> = {};

	let cycles = 0;
	let config = "";

	while (!(config in seen)) {
		seen[config] = cycles++;

		let max = Math.max(...banks);
		let i = banks.findIndex((blocks) => blocks === max);

		banks[i] = 0;

		while (max--) {
			i = (i + 1) % banks.length;
			banks[i]++;
		}

		config = banks.join();
	}

	return [cycles, cycles - seen[config]];
}

register(day06, "Memory Reallocation", [4074, 2793]);
