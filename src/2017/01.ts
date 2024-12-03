import input from "$input/2017/01.txt";
import { solve } from "$lib";

function find(offset = 1) {
	let solution = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + offset) % input.length]) {
			solution += Number(input[i]);
		}
	}

	return solution;
}

function day01() {
	return [find(), find(input.length / 2)];
}

solve("Day 1: Inverse Captcha", day01, [1029, 1220]);
