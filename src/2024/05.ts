import input from "$input/2024/05.txt";
import { register } from "$lib/aoc";

export default function day05() {
	const [rules, updates] = input
		.split("\n\n")
		.map((block) => block.split("\n").map((line) => line.split(/[|,]/).map(Number)));

	function isOrdered(update: number[]) {
		const positions = new Map(update.map((page, i) => [page, i]));

		return rules.every(([before, after]) => {
			return (
				!positions.has(before) ||
				!positions.has(after) ||
				positions.get(before)! < positions.get(after)!
			);
		});
	}

	function order(update: number[]) {
		const graph = new Map<number, number[]>();
		const inDegree = new Map<number, number>();

		for (const page of update) {
			graph.set(page, []);
			inDegree.set(page, 0);
		}

		for (const [before, after] of rules) {
			if (graph.has(before) && graph.has(after)) {
				graph.get(before)!.push(after);
				inDegree.set(after, inDegree.get(after)! + 1);
			}
		}

		const queue = inDegree.entries().reduce<number[]>((queue, [page, degree]) => {
			return degree === 0 ? queue.concat(page) : queue;
		}, []);

		const ordered: number[] = [];

		while (queue.length) {
			const page = queue.shift()!;
			ordered.push(page);

			for (const neighbor of graph.get(page)!) {
				inDegree.set(neighbor, inDegree.get(neighbor)! - 1);

				if (inDegree.get(neighbor) === 0) {
					queue.push(neighbor);
				}
			}
		}

		return ordered;
	}

	let ordered = 0;
	let reordered = 0;

	for (const update of updates) {
		if (isOrdered(update)) {
			ordered += update[(update.length / 2) | 0];
		} else {
			const ordered = order(update);
			reordered += ordered[(ordered.length / 2) | 0];
		}
	}

	return [ordered, reordered];
}

register(day05, "Print Queue", [5588, 5331]);
