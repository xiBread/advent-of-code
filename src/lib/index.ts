import assert from "node:assert";
import util from "node:util";

export * from "./ocr";
export * from "./util";

util.inspect.defaultOptions.numericSeparator = true;

export function solve<T>(label: string, fn: () => T | undefined, verify?: T): void {
	const start = performance.now();
	const answers = fn();
	const end = performance.now();

	let duration = end - start;
	let unit = "ms";

	if (duration < 1) {
		duration *= 1000;
		unit = "µs";
	}

	if (duration >= 1000) {
		duration /= 1000;
		unit = "s";
	}

	console.log(
		util.styleText("gray", `[${duration.toFixed(2) + unit}]`),
		label,
		answers ?? util.styleText("cyan", "TODO"),
	);

	if (verify) {
		if (Array.isArray(answers)) {
			assert(Array.isArray(verify));

			console.assert(
				answers[0] === verify[0],
				`Part 1: Expected ${verify[0]}, got ${answers[0]}`,
			);

			console.assert(
				answers[1] === verify[1],
				`Part 2: Expected ${verify[1]}, got ${answers[1]}`,
			);
		} else {
			console.assert(answers === verify, `Expected ${verify}, got ${answers}`);
		}
	}
}
