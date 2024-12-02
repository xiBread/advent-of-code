import input from "$input/2016/18.txt";
import { solve } from "$lib";

import { sum } from "c8n";

function day18() {
	function scan(rows: number) {
		let tiles = [...input].map<number>((tile) => (tile === "." ? 1 : 0));
		let safe = sum(tiles);

		for (let i = 1; i < rows; i++) {
			const next: number[] = [];

			for (let j = 0; j < tiles.length; j++) {
				const left = tiles[j - 1] ?? 1;
				const right = tiles[j + 1] ?? 1;

				next.push(left ^ right ^ 1);
			}

			tiles = next;
			safe += sum(tiles);
		}

		return safe;
	}

	return [scan(40), scan(400_000)];
}

solve("Day 18: Like a Rogue", day18, [1956, 19_995_121]);
