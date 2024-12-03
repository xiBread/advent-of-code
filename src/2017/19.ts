import input from "$input/2017/19.txt";
import { register } from "$lib/aoc";

export default function day19() {
	const diagram = input.split("\n");

	let letters = "";
	let steps = 0;

	let [x, y] = [diagram[0].indexOf("|"), 0];
	let direction = [0, 1];

	while (true) {
		const char = diagram[y][x];
		if (char === " ") break;

		steps++;

		if (/[A-Z]/.test(char)) {
			letters += char;
		}

		if (char === "+") {
			if (direction[0]) {
				direction = [0, (diagram[y - 1]?.[x] ?? " ") !== " " ? -1 : 1];
			} else {
				direction = [diagram[y][x - 1] !== " " ? -1 : 1, 0];
			}
		}

		x += direction[0];
		y += direction[1];
	}

	return [letters, steps];
}

register(day19, "A Series of Tubes", ["VTWBPYAQFU", 17_358]);
