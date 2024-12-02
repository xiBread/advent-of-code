import input from "$input/2016/22.txt";
import { solve } from "$lib";

interface Node {
	x: number;
	y: number;
	size: number;
	used: number;
	avail: number;
}

interface State {
	emptyPos: string;
	goalPos: string;
	steps: number;
}

function day22() {
	const nodes = input
		.split("\n")
		.slice(2)
		.map((line) => {
			// /dev/grid/node-x(0)-y(0)   (10)T    (8)T     (2)T   (80)%
			const [x, y, size, used, avail] = line.match(/\d+/g)!.map(Number);

			return { x, y, size, used, avail };
		});

	let pairs = 0;
	let steps = 0;

	for (let i = 0; i < nodes.length; i++) {
		for (let j = 0; j < nodes.length; j++) {
			if (nodes[i].used > 0 && i !== j && nodes[i].used <= nodes[j].avail) {
				pairs++;
			}
		}
	}

	const grid: Record<string, Node> = {};

	let empty = {} as Node;
	let goal = {} as Node;

	let maxX = 0;
	let maxY = 0;

	for (const node of nodes) {
		grid[`${node.x},${node.y}`] = node;

		maxX = Math.max(maxX, node.x);
		maxY = Math.max(maxY, node.y);

		if (node.used === 0) empty = node;
		if (node.x === maxX && node.y === 0) goal = node;
	}

	const queue: State[] = [];
	const visited = new Set<string>();

	const neighbors = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];

	const initial = {
		emptyPos: `${empty.x},${empty.y}`,
		goalPos: `${goal.x},${goal.y}`,
		steps: 0,
	};

	queue.push(initial);
	visited.add(`${initial.emptyPos}|${initial.goalPos}`);

	while (queue.length) {
		const state = queue.shift()!;

		const [ex, ey] = state.emptyPos.split(",").map(Number);
		const [gx, gy] = state.goalPos.split(",").map(Number);

		if (gx === 0 && gy === 0) {
			steps = state.steps;
			break;
		}

		for (const [dx, dy] of neighbors) {
			const nx = ex + dx;
			const ny = ey + dy;

			const nextEmpty = `${nx},${ny}`;
			const nextGoal = gx === nx && gy === ny ? `${ex},${ey}` : `${gx},${gy}`;

			const positions = `${nextEmpty}|${nextGoal}`;

			if (!grid[nextEmpty] || grid[nextEmpty].used > empty.size) continue;

			if (!visited.has(positions)) {
				visited.add(positions);

				queue.push({
					emptyPos: nextEmpty,
					goalPos: nextGoal,
					steps: state.steps + 1,
				});
			}
		}
	}

	return [pairs, steps];
}

solve("Day 22: Grid Computing", day22, [888, 236]);
