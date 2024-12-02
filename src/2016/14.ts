import crypto from "node:crypto";

import input from "$input/2016/14.txt";
import { solve } from "$lib";

function md5(data: string) {
	return crypto.createHash("md5").update(data).digest("hex");
}

function stretch(data: string) {
	let hash = md5(data);

	for (let i = 0; i < 2016; i++) {
		hash = md5(hash);
	}

	return hash;
}

// Same sentiments as Day 5
function day14() {
	function generate(secure = false) {
		const hashes = new Map<number, string>();
		const keys: number[] = [];

		let index = 0;

		function getHash(index: number) {
			if (!hashes.has(index)) {
				hashes.set(index, secure ? stretch(input + index) : md5(input + index));
			}

			return hashes.get(index)!;
		}

		while (keys.length < 64) {
			const hash = getHash(index);
			const triplet = hash.match(/(.)\1\1/);

			if (triplet) {
				const quintet = triplet[1].repeat(5);

				for (let i = index + 1; i <= index + 1000; i++) {
					if (getHash(i).includes(quintet)) {
						keys.push(index);
						break;
					}
				}
			}

			index++;
		}

		return keys[63];
	}

	return [generate(), generate(true)];
}

solve("Day 14: One-Time Pad", day14, [18_626, 20_092]);
