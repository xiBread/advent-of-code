import input from "$input/2017/04.txt";
import { register } from "$lib/aoc";

import { count } from "c8n";

export default function day04() {
	const passphrases = input.split("\n").map((line) => line.split(" "));

	return [
		count(passphrases, (p) => new Set(p).size === p.length),
		count(passphrases, (p) => new Set(p.map((w) => [...w].sort().join(""))).size === p.length),
	];
}

register(day04, "High-Entropy Passphrases", [337, 231]);
