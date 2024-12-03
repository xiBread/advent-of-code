import input from "$input/2017/02.txt";
import { solve } from "$lib";

function day02() {
	const rows = input.split("\n").map((line) =>
		line
			.split(/\s+/)
			.map(Number)
			.sort((a, b) => a - b),
	);

	let sum = 0;

	for (const row of rows) {
		for (let i = row.length ** 2; i--; ) {
			const x = row[~~(i / row.length)];
			const y = row[i % row.length];

			if (x !== y && x % y === 0) {
				sum += x / y;
			}
		}
	}

	return [rows.reduce((sum, row) => sum + row.at(-1)! - row[0], 0), sum];
}

solve("Day 2: Corruption Checksum", day02, [47_136, 250]);
