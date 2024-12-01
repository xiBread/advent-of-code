import input from "$input/2024/01.txt";
import { solve } from "$lib";

import { count, transpose } from "c8n";

function day01() {
	const ids = input.split("\n").map((line) => line.split(/ +/).map(Number));
	const [left, right] = transpose(ids);

	left.sort((a, b) => a - b)
	right.sort((a, b) => a - b)

	let distance = 0;
	let score = 0;

	for (let i = 0; i < left.length; i++) {
		distance += Math.abs(left[i] - right[i]);
		score += left[i] * count(right, (n) => n === left[i])
	}

	return [distance, score]
}

solve("Day 1: Historian Hysteria", day01);
