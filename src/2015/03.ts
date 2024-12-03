import input from "$input/2015/03.txt";
import { register } from "$lib/aoc";

function visit(santas: number) {
	const houses = new Set(["0,0"]);
	const positions = [
		[0, 0],
		[0, 0],
	];

	for (let i = 0; i < input.length; i++) {
		const position = positions[i % santas];

		const coord = /\^|v/.test(input[i]) ? 1 : 0;
		const direction = /\^|>/.test(input[i]) ? 1 : -1;

		position[coord] += direction;
		houses.add(position.join());
	}

	return houses.size;
}

export default function day03() {
	return [visit(1), visit(2)];
}

register(day03, "Perfectly Spherical Houses in a Vacuum", [2081, 2341]);
