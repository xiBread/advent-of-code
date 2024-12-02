import crypto from "node:crypto";

import input from "$input/2016/05.txt";
import { solve } from "$lib";

// Average ~20s; unaware of any way to speed this up unfortunately
function day05() {
	let oldPassword = "";
	const newPassword: string[] = [];

	let index = 0;
	let filled = 0;

	while (oldPassword.length < 8 || filled < 8) {
		const hash = crypto
			.createHash("md5")
			.update(input + index)
			.digest("hex");

		if (hash.startsWith("00000")) {
			if (oldPassword.length < 8) {
				oldPassword += hash[5];
			}

			const position = Number(hash[5]);

			if (position >= 0 && position < 8 && !newPassword[position]) {
				newPassword[position] = hash[6];
				filled++;
			}
		}

		index++;
	}

	return [oldPassword, newPassword.join("")];
}

solve("Day 5: How About a Nice Game of Chess", day05, ["d4cd2ee1", "f2c730e5"]);
