import input from "$input/2016/08.txt";
import { ocr, register } from "$lib/aoc";

import { sum } from "c8n";

const WIDTH = 50;
const HEIGHT = 6;

export default function day08() {
	const instructions = input.split("\n");

	const screen = Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => 0));

	for (const instr of instructions) {
		const [, a, b] = instr.split(/[^\d]+/).map(Number);

		const x = -b % WIDTH;
		const y = -b % HEIGHT;

		// i=9 grabs the 'w' or 'l' in "rotate row" or "rotate column";
		// otherwise, 'r' in "rect"
		const operation = instr[9] ?? instr[0];

		if (operation === "r") {
			for (let i = b * a; i--; ) {
				screen[~~(i / a)][i % a] = 1;
			}
		} else if (operation === "w") {
			screen[a] = [...screen[a].slice(x), ...screen[a].slice(0, x)];
		} else if (operation === "l") {
			let temp: number[] = [];

			screen.forEach((row) => temp.push(row[a]));
			temp = [...temp.slice(y), ...temp.slice(0, y)];
			screen.forEach((row, i) => (row[a] = temp[i]));
		}
	}

	return [sum(screen.flat()), ocr(screen)];
}

register(day08, "Two-Factor Authentication", [116, "UPOJFLBCEZ"]);
