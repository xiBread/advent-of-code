import input from "$input/2015/09.txt";
import { solve } from "$lib";

import { minmax, permutations, windows } from "c8n";

function day09() {
	const locations = input.split("\n").map((line) => line.match(/([A-Z]\w+|\d+)/g)!);
	const routes: Record<string, Record<string, number>> = {};

	for (const [start, end, distance] of locations) {
		(routes[start] ??= {})[end] = Number(distance);
		(routes[end] ??= {})[start] = Number(distance);
	}

	const distances = [];

	for (const route of permutations(Object.keys(routes))) {
		let distance = 0;

		for (const [a, b] of windows(route, 2)) {
			distance += routes[a][b];
		}

		distances.push(distance);
	}

	return minmax(distances);
}

solve("Day 9: All in a Single Night", day09, [251, 898]);
