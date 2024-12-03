import input from "$input/2017/17.txt";
import { register } from "$lib/aoc";

export default function day17() {
	const steps = Number(input);
	const buffer = [0];

	let x = 0;
	let y = 0;
	let value = 0;

	for (let i = 0; i <= 2016; i++) {
		x = ((x + steps) % buffer.length) + 1;
		buffer.splice(x, 0, i + 1);
	}

	for (let i = 1; i <= 50_000_000; i++) {
		y = ((y + steps) % i) + 1;
		if (y === 1) value = i;
	}

	return [buffer[x + 1], value];
}

register(day17, "Two Steps Forward", [180, 13_326_437]);
