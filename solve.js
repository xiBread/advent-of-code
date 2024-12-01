/* eslint-disable antfu/no-top-level-await */
// @ts-check

import fs from "node:fs";
import module from "node:module";
import process from "node:process";

module.register("./hooks.js", import.meta.url);

const [year, day] = process.argv.slice(2);

if (!day) {
	for (let i = 1; i <= 25; i++) {
		const file = `./src/${year}/${i.toString().padStart(2, "0")}.ts`;

		if (!fs.existsSync(file)) continue;
		await import(file);
	}
} else {
	await import(`./src/${year}/${day.padStart(2, "0")}.ts`);
}
