import input from "$input/2017/01.txt";
import { register } from "$lib/aoc";

function find(offset = 1) {
	let solution = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + offset) % input.length]) {
			solution += Number(input[i]);
		}
	}

	return solution;
}

export default function day01() {
	return [find(), find(input.length / 2)];
}

register(day01, "Inverse Captcha", [1029, 1220]);
