import input from "$input/2017/03.txt";
import { solve } from "$lib";

function day03() {
	const square = Number(input);
	const grid: Record<string, number> = { "0,0": 1 };

	let x = 0;
	let y = 0;
	let value = 0;

	while (value < square) {
		value = 0;

		for (let i = x - 1; i <= x + 1; i++) {
			for (let j = y - 1; j <= y + 1; j++) {
				value += grid[`${i},${j}`] ?? 0;
			}
		}

		grid[`${x},${y}`] = value;

		if ((x !== y || x >= 0) && Math.abs(x) <= Math.abs(y)) {
			x += y >= 0 ? 1 : -1;
		} else {
			y += x >= 0 ? -1 : 1;
		}
	}

	const size = -~(square ** 0.5);
	const center = -~(size / 2);

	return [center - 1 + (center - (square % size)), value];
}

solve("Day 3: Spiral Memory", day03, [552, 330785]);
