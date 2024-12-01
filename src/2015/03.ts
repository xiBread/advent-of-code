import input from "$input/2015/03.txt";
import { solve } from "$lib";

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

function day03() {
	return [visit(1), visit(2)];
}

solve("Day 3: Perfectly Spherical Houses in a Vacuum", day03, [2081, 2341]);
