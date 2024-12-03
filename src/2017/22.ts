import input from "$input/2017/22.txt";
import { solve } from "$lib";

type NodeStatus = "clean" | "weakened" | "infected" | "flagged";

function day22() {
	const map = input.split("\n");

	const nodes = new Map<string, NodeStatus>();
	const center = Math.floor(map.length / 2);

	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map[y].length; x++) {
			if (map[y][x] === "#") {
				nodes.set(`${x - center},${y - center}`, "infected");
			}
		}
	}

	const directions = [
		[0, -1], // U
		[1, 0], // R
		[0, 1], // D
		[-1, 0], // L
	];

	function burst(bursts: number, evolved = false) {
		const map = new Map(nodes);
		const position = [0, 0];

		let direction = 0;
		let infections = 0;

		for (let i = 0; i < bursts; i++) {
			const node = position.join(",");
			const status = map.get(node) ?? "clean";

			if (evolved) {
				if (status === "clean") {
					direction = (direction + 3) % 4;
					map.set(node, "weakened");
				} else if (status === "weakened") {
					map.set(node, "infected");
					infections++;
				} else if (status === "infected") {
					direction = (direction + 1) % 4;
					map.set(node, "flagged");
				} else if (status === "flagged") {
					direction = (direction + 2) % 4;
					map.delete(node);
				}
			} else if (status === "clean") {
				direction = (direction + 3) % 4;
				map.set(node, "infected");
				infections++;
			} else {
				direction = (direction + 1) % 4;
				map.delete(node);
			}

			position[0] += directions[direction][0];
			position[1] += directions[direction][1];
		}

		return infections;
	}

	return [burst(10_000), burst(10_000_000, true)];
}

solve("Day 22: Sporifica Virus", day22, [5565, 2_511_978]);
