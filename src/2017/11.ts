import input from "$input/2017/11.txt";
import { register } from "$lib/aoc";

export default function day11() {
	const position = { x: 0, y: 0, z: 0 };
	const distances: number[] = [];

	const { abs } = Math;
	const distance = (pos: typeof position) => (abs(pos.x) + abs(pos.y) + abs(pos.z)) / 2;

	for (const step of input.split(",")) {
		if (step === "n") {
			position.y++;
			position.z--;
		} else if (step === "s") {
			position.y--;
			position.z++;
		} else if (step === "ne") {
			position.x++;
			position.z--;
		} else if (step === "nw") {
			position.x--;
			position.y++;
		} else if (step === "sw") {
			position.x--;
			position.z++;
		} else if (step === "se") {
			position.x++;
			position.y--;
		}

		distances.push(distance(position));
	}

	return [distance(position), Math.max(...distances)];
}

register(day11, "Hex Ed", [796, 1585]);
