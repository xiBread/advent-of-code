import crypto from "node:crypto";

import input from "$input/2015/04.txt";
import { register } from "$lib/aoc";

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

export default function day04() {
	return [mine(5), mine(6)];
}

register(day04, "The Ideal Stocking Stuffer", [254_575, 1_038_736]);
