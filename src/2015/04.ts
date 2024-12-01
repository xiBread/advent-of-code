import crypto from "node:crypto";

import input from "$input/2015/04.txt";
import { solve } from "$lib";

function mine(zeroes: number) {
	for (let i = 0; ; i++) {
		const hash = crypto
			.createHash("md5")
			.update(input + i)
			.digest("hex");

		if (hash.startsWith("0".repeat(zeroes))) {
			return i;
		}
	}
}

function day04() {
	return [mine(5), mine(6)];
}

solve("Day 4: The Ideal Stocking Stuffer", day04, [254_575, 1_038_736]);
