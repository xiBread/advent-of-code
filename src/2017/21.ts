import input from "$input/2017/21.txt";
import { register } from "$lib/aoc";

import { count } from "c8n";

function rotate(grid: string[]) {
	const rotated = Array.from({ length: grid.length }, () => [] as string[]);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid.length; x++) {
			rotated[x][grid.length - y - 1] = grid[y][x];
		}
	}

	return rotated.map((row) => row.join(""));
}

function flip(grid: string[]) {
	return grid.map((row) => [...row].reverse().join(""));
}

export default function day21() {
	const book = input.split("\n");
	const rules = new Map<string, string[]>();

	for (const rule of book) {
		const [from, to] = rule.split(" => ").map((ptn) => ptn.split("/"));

		let variations = [from];

		for (let i = 0; i < 3; i++) {
			variations.push(rotate(variations[variations.length - 1]));
		}

		variations = [...variations, ...variations.map(flip)];

		for (const variation of variations) {
			rules.set(variation.join("/"), to);
		}
	}

	function enhance(grid: string[][]) {
		const subSize = grid.length % 2 === 0 ? 2 : 3;
		const newSize = (grid.length / subSize) * (subSize + 1);

		const enhanced = Array.from({ length: newSize }, () => [] as string[]);

		for (let y = 0; y < grid.length; y += subSize) {
			for (let x = 0; x < grid.length; x += subSize) {
				const subgrid: string[][] = [];

				for (let i = 0; i < subSize; i++) {
					subgrid.push(grid[y + i].slice(x, x + subSize));
				}

				const pattern = subgrid.map((row) => row.join("")).join("/");
				const rule = rules.get(pattern) ?? [];

				for (let i = 0; i < rule.length; i++) {
					enhanced[(y / subSize) * rule.length + i].push(...rule[i]);
				}
			}
		}

		return enhanced;
	}

	function generate(iterations: number) {
		let image = [
			[".", "#", "."],
			[".", ".", "#"],
			["#", "#", "#"],
		];

		for (let i = 0; i < iterations; i++) {
			image = enhance(image);
		}

		return count(image.flat(), (pixel) => pixel === "#");
	}

	return [generate(5), generate(18)];
}

register(day21, "Fractal Art", [160, 2_271_537]);
