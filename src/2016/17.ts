import crypto from "node:crypto";

import input from "$input/2016/17.txt";
import { register } from "$lib/aoc";

const moves: Record<string, (x: number, y: number) => number[]> = {
	U: (x, y) => [x, y - 1],
	D: (x, y) => [x, y + 1],
	L: (x, y) => [x - 1, y],
	R: (x, y) => [x + 1, y],
};

function traverse(start: number[], target: number[]) {
	const queue: [number[], string][] = [[start, ""]];
	const paths: string[] = [];

	while (queue.length) {
		const [[x, y], path] = queue.shift()!;

		const hash = crypto
			.createHash("md5")
			.update(input + path)
			.digest("hex");

		for (let i = 0; i < 4; i++) {
			if (!/[b-f]/.test(hash[i])) continue;

			const dir = "UDLR"[i];
			const [dx, dy] = moves[dir](x, y);

			if (dx < 0 || dx >= 4 || dy < 0 || dy >= 4) continue;

			if (dx === target[0] && dy === target[1]) {
				paths.push(path + dir);
			} else {
				queue.push([[dx, dy], path + dir]);
			}
		}
	}

	return paths;
}

export default function day17() {
	const paths = traverse([0, 0], [3, 3]);

	return [paths[0], paths.at(-1)!.length];
}

register(day17, "Two Steps Forward", ["RDDRULDDRR", 766]);
