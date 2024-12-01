// @ts-check

import fs from "node:fs/promises";

/** @type {import("node:module").LoadHook} */
export async function load(url, context, next) {
	if (!url.endsWith(".txt")) return next(url, context);

	const [, year, day] = /\/input\/(20\d{2})\/(\d{2})/.exec(url) ?? [];
	const content = await fs.readFile(`./input/${year}/${day}.txt`, "utf8");

	return {
		format: "json",
		shortCircuit: true,
		source: JSON.stringify(content),
	};
}
