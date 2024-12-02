import input from "$input/2016/20.txt";
import { solve } from "$lib";

function day20() {
	const ranges = input
		.split("\n")
		.map((line) => line.split("-").map(Number))
		.sort((a, b) => a[0] - b[0]);

	let lowest = 0;
	let allowed = 0;

	let prevEnd = -1;

	for (const [start, end] of ranges) {
		const valid = Math.max(0, start - prevEnd - 1);

		allowed += valid;
		lowest = !lowest && valid ? prevEnd + 1 : lowest;

		prevEnd = Math.max(prevEnd, end);
	}

	return [lowest, allowed];
}

solve("Day 20: Firewall Rules", day20, [19_449_262, 119]);
