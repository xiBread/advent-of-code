import input from "$input/2016/01.txt";
import { solve } from "$lib";
import { manhattan } from "$lib/math";

function day01() {
	const units = input.split(", ").map((line) => [line[0], line.slice(1)]);

	const position = [0, 0];
	const visited = new Set<string>();

	let twice = Number.NaN;

	for (let i = 1, j = 0; j < units.length; j++) {
		i += ~units[j][0].charCodeAt(0) & 3;

		for (let k = Number(units[j][1]); k--; ) {
			position[i & 1] += (i & 2) - 1;

			if (!twice && visited.has(`${position}`)) {
				twice = manhattan(position);
			}

			visited.add(`${position}`);
		}
	}

	return [manhattan(position), twice];
}

solve("Day 1: No Time for a Taxicab", day01, [287, 133]);
