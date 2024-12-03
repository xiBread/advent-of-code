import input from "$input/2015/10.txt";
import { register } from "$lib/aoc";

function next(current: number[]) {
	const sequence: number[] = [];

	for (let i = 0; i < current.length; ) {
		const digit = current[i];
		let count = 1;

		while (i + count < current.length && current[i + count] === digit) {
			count++;
		}

		sequence.push(count, digit);
		i += count;
	}

	return sequence;
}

function iterate(n: number) {
	let sequence = input.split("").map(Number);

	for (let i = 0; i < n; i++) {
		sequence = next(sequence);
	}

	return sequence.length;
}

export default function day10() {
	return [iterate(40), iterate(50)];
}

register(day10, "Elves Look, Elves Say", [360_154, 5_103_798]);
