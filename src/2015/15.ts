import input from "$input/2015/15.txt";
import { solve } from "$lib";

function day15() {
	const values = input.split("\n").map((line) => line.match(/-?\d+/g)!.map(Number));

	function score(amounts: number[]) {
		let capacity = 0;
		let durability = 0;
		let flavor = 0;
		let texture = 0;

		for (let i = 0; i < values.length; i++) {
			capacity += values[i][0] * amounts[i];
			durability += values[i][1] * amounts[i];
			flavor += values[i][2] * amounts[i];
			texture += values[i][3] * amounts[i];
		}

		return (
			Math.max(0, capacity) *
			Math.max(0, durability) *
			Math.max(0, flavor) *
			Math.max(0, texture)
		);
	}

	function mix(
		n: number,
		teaspoons: number,
		update: (vals: number[]) => void,
		values: number[] = [],
	) {
		if (n === 1) {
			values.push(teaspoons);
			update(values);
			values.pop();

			return;
		}

		for (let i = 0; i <= teaspoons; i++) {
			values.push(i);
			mix(n - 1, teaspoons - i, update, values);
			values.pop();
		}
	}

	function calories(amounts: number[]) {
		return values.reduce((cals, ing, i) => cals + ing[4] * amounts[i], 0);
	}

	function optimize(target?: number) {
		let max = 0;

		mix(values.length, 100, (vals) => {
			if (!target || calories(vals) === target) {
				max = Math.max(max, score(vals));
			}
		});

		return max;
	}

	return [optimize(), optimize(500)];
}

solve("Day 15: Science for Hungry People", day15, [18_965_440, 15_862_900]);
