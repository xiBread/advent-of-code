/* eslint-disable antfu/no-top-level-await */

import module from "node:module";
import process from "node:process";
import util from "node:util";
import { getBorderCharacters, table } from "table";

util.inspect.defaultOptions.colors = true;
util.inspect.defaultOptions.numericSeparator = true;

// eslint-disable-next-line ts/no-unsafe-function-type
interface Solution extends Function {
	title: string;
	answer: unknown;
}

module.register("../hooks.js", import.meta.url);

const args = util.parseArgs({
	args: process.argv.slice(2),
	allowPositionals: true,
	options: {
		skip: {
			type: "string",
		},
	},
});

const headings = ["Day", "Title", "Part 1", "Part 2", "Time"].map((h) => util.styleText("bold", h));
const rows: string[][] = [];

const [year, day] = args.positionals;
const skipped = args.values.skip?.split(" ").map(Number) ?? [];

if (!day) {
	for (let i = 1; i <= 25; i++) {
		if (skipped.includes(i)) continue;
		await run(i.toString());
	}
} else {
	await run(day);
}

console.log(
	table([headings, ...rows], {
		header: day ? undefined : { content: `Advent of Code: ${year}`, alignment: "center" },
		border: getBorderCharacters("norc"),
	}),
);

async function run(day: string) {
	const path = `./${year}/${day.padStart(2, "0")}.ts`;

	try {
		solve((await import(path)).default);
	} catch {}
}

function formatAnswer(answer: unknown, expected?: unknown) {
	if (!answer) {
		return util.styleText("gray", "N/A");
	}

	if (expected) {
		return [
			`${util.styleText("red", "-")} ${answer}`,
			`${util.styleText("green", "+")} ${expected}`,
		].join("\n");
	}

	return util.inspect(answer);
}

function solve(solution: Solution) {
	const start = performance.now();
	const answer = solution();
	const end = performance.now();

	let duration = end - start;
	let unit = "ms";
	let color: Parameters<typeof util.styleText>[0] = "green";

	if (duration < 1) {
		duration *= 1000;
		unit = "µs";
	} else if (duration >= 100 && duration < 1000) {
		color = "yellow";
	} else if (duration >= 1000) {
		duration /= 1000;
		unit = "s";
		color = "red";
	}

	const isFinal = solution.name.includes("25");
	const parts: string[] = [];
	let stars = "";

	if (isFinal) {
		parts.push(
			answer === solution.answer
				? formatAnswer(answer)
				: formatAnswer(answer, solution.answer),
			formatAnswer(undefined),
		);

		if (answer === solution.answer) {
			stars = "⭐";
		}
	} else if (Array.isArray(answer) && Array.isArray(solution.answer)) {
		for (let i = 0; i < 2; i++) {
			if (answer[i] === solution.answer[i]) {
				stars += !stars && i === 1 ? "  ⭐" : "⭐";
				parts[i] = formatAnswer(answer[i]);
			} else {
				parts[i] = formatAnswer(answer[i], solution.answer[i]);
			}
		}
	} else {
		parts.push(formatAnswer(undefined), formatAnswer(undefined));
	}

	rows.push([
		`${solution.name.slice(3)} ${stars}`,
		solution.title,
		...parts,
		util.styleText(color, duration.toFixed(2)) + util.styleText("gray", unit),
	]);
}
