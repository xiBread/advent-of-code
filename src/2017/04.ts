import input from "$input/2017/04.txt";
import { solve } from "$lib";

import { count } from "c8n";

function day04() {
	const passphrases = input.split("\n").map((line) => line.split(" "));

	return [
		count(passphrases, (p) => new Set(p).size === p.length),
		count(passphrases, (p) => new Set(p.map((w) => [...w].sort().join(""))).size === p.length),
	];
}

solve("Day 4: High-Entropy Passphrases", day04, [337, 231]);
