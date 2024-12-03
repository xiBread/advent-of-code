import input from "$input/2016/03.txt";
import { register } from "$lib/aoc";

const isPossible = ([a, b, c]: number[]) => a + b > c && a + c > b && b + c > a;

export default function day03() {
	const trangles = input.split("\n").map((line) => line.match(/(\d+)/g)!.map(Number));

	let columns = 0;

	for (let y = 0; y < trangles.length; y += 3) {
		for (let x = 0; x < 3; x++) {
			columns += isPossible([trangles[y][x], trangles[y + 1][x], trangles[y + 2][x]]) ? 1 : 0;
		}
	}

	return [trangles.filter(isPossible).length, columns];
}

register(day03, "Squares With Three Sides", [917, 1649]);
