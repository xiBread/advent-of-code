import input from "$input/2024/02.txt";
import { register } from "$lib/aoc";

function isSafe(report: number[]) {
	const differences: number[] = [];

	for (let i = 1; i < report.length; i++) {
		differences.push(report[i] - report[i - 1]);
	}

	const increasing = differences.every((d) => d >= 1 && d <= 3);
	const decreasing = differences.every((d) => d <= -1 && d >= -3);

	return increasing || decreasing;
}

export default function day02() {
	const reports = input.split("\n").map((line) => line.split(" ").map(Number));

	let safe = 0;
	let madeSafe = 0;

	for (const report of reports) {
		const reportSafe = isSafe(report);
		let tolerable = false;

		for (let i = 0; i < report.length; i++) {
			const removed = report.toSpliced(i, 1);

			if (isSafe(removed)) {
				tolerable = true;
				break;
			}
		}

		if (reportSafe) safe++;
		if (reportSafe || tolerable) madeSafe++;
	}

	return [safe, madeSafe];
}

register(day02, "Red-Nosed Reports", [220, 296]);
