import input from "$input/2015/02.txt";
import { register } from "$lib/aoc";

export default function day02() {
	const dimensions = input.split("\n").map((line) => line.split("x").map(Number));

	let paper = 0;
	let ribbon = 0;

	for (const [l, w, h] of dimensions) {
		const [a, b] = [l, w, h].sort((a, b) => a - b);

		paper += 2 * l * w + 2 * w * h + 2 * h * l + a * b;
		ribbon += 2 * a + 2 * b + l * w * h;
	}

	return [paper, ribbon];
}

register(day02, "I Was Told There Would Be No Math", [1_588_178, 3_783_758]);
