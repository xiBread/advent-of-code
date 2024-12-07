import input from "$input/2024/01.txt";
import { register } from "$lib/aoc";

import { count, transpose } from "c8n";

export default function day01() {
	const ids = input.split("\n").map((line) => line.split(/ +/).map(Number));
	const [left, right] = transpose(ids);

	let distance = 0;
	let score = 0;

	for (let i = 0; i < left.length; i++) {
		distance += Math.abs(left[i] - right[i]);
		score += left[i] * count(right, (n) => n === left[i]);
	}

	return [distance, score];
}

register(day01, "Historian Hysteria", [3_574_690, 22_565_391]);
