import input from "$input/2016/20.txt";
import { register } from "$lib/aoc";

export default function day20() {
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

register(day20, "Firewall Rules", [19_449_262, 119]);
