import input from "$input/2024/11.txt";
import { register } from "$lib/aoc";
import { divmod } from "$lib/math";

import { countBy } from "c8n";

export default function day11() {
	const initial = countBy(input.split(" ").map(Number), (n) => n);

	function blink(blinks: number, stones = initial) {
		if (!blinks) {
			return stones.values().reduce((total, val) => total + val);
		}

		const next = new Map<number, number>();
		const incr = (key: number, by: number) => (next.get(key) ?? 0) + by;

		for (const [stone, count] of stones) {
			if (!stone) {
				next.set(1, incr(1, count));
			} else {
				const length = Math.floor(Math.log10(stone)) + 1;

				if (length % 2 === 0) {
					const [left, right] = divmod(stone, 10 ** Math.floor(length / 2));

					next.set(left, incr(left, count));
					next.set(right, incr(right, count));
				} else {
					next.set(stone * 2024, incr(stone * 2024, count));
				}
			}
		}

		return blink(blinks - 1, next);
	}

	return [blink(25), blink(75)];
}

register(day11, "Plutonian Pebbles", [235_850, 279_903_140_844_645]);
