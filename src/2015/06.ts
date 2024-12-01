import input from "$input/2015/06.txt";
import { solve } from "$lib";

import { sum } from "c8n";

const WIDTH = 1000;
const HEIGHT = 1000;

function day06() {
	const instructions = input.split("\n").map((line) => line.split(/[ ,]/));

	const grid = Array.from({ length: WIDTH * HEIGHT }, () => 0);
	const copy = [...grid];

	for (const instr of instructions) {
		const operation = instr.at(-6)!;
		const [x1, y1, , x2, y2] = instr.slice(-5).map(Number);

		for (let x = x1; x <= x2; x++) {
			for (let y = y1; y <= y2; y++) {
				const light = WIDTH * y + x;

				if (operation === "on") {
					grid[light] = 1;
					copy[light]++;
				} else if (operation === "off") {
					grid[light] = 0;
					copy[light] = Math.max(0, copy[light] - 1);
				} else {
					grid[light] ^= 1;
					copy[light] += 2;
				}
			}
		}
	}

	return [sum(grid), sum(copy)];
}

solve("Day 6: Probably a Fire Hazard", day06, [543_903, 14_687_245]);
