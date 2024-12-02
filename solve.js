/* eslint-disable antfu/no-top-level-await */
// @ts-check

import fs from "node:fs";
import module from "node:module";
import process from "node:process";
import util from "node:util";

module.register("./hooks.js", import.meta.url);

const args = util.parseArgs({
	args: process.argv.slice(2),
	allowPositionals: true,
	options: {
		skip: {
			type: "string",
		},
	},
});

const [year, day] = args.positionals;

if (!day) {
	const days = args.values.skip?.split(" ").map(Number) ?? [];

	for (let i = 1; i <= 25; i++) {
		if (days.includes(i)) continue;

		const file = `./src/${year}/${i.toString().padStart(2, "0")}.ts`;

		if (!fs.existsSync(file)) continue;
		await import(file);
	}
} else {
	await import(`./src/${year}/${day.padStart(2, "0")}.ts`);
}
