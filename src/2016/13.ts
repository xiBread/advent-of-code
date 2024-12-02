import input from "$input/2016/13.txt";
import { solve } from "$lib";

import { count } from "c8n";

const TARGET = "31,39";

function isWall(x: number, y: number) {
	const sum = x * x + 3 * x + 2 * x * y + y + y * y + Number(input);
	const ones = count(sum.toString(2), (bit) => bit === "1");

	return ones % 2 === 1;
}

function day13() {
	const visited: Record<string, number> = { "1,1": 0 };
	const maze = { points: [[1, 1]], pos: 0, end: 0 };

	let locations = 0;

	const neighbors = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];

	while (maze.pos <= maze.end || !visited[TARGET]) {
		const [x, y] = maze.points[maze.pos];
		const steps = visited[`${x},${y}`];

		for (const [dx, dy] of neighbors) {
			const nx = x + dx;
			const ny = y + dy;
			const pt = `${nx},${ny}`;

			if (nx >= 0 && ny >= 0 && !visited[pt] && !isWall(nx, ny)) {
				visited[pt] = steps + 1;
				maze.points[++maze.end] = [nx, ny];

				if (steps < 50) locations++;
			}
		}

		maze.pos++;
	}

	return [visited[TARGET], locations];
}

solve("Day 13: A Maze of Twisty Little Cubicles", day13, [92, 124]);
