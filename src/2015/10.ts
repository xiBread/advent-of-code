import input from "$input/2015/10.txt";
import { solve } from "$lib";

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

function day10() {
	return [iterate(40), iterate(50)];
}

solve("Day 10: Elves Look, Elves Say", day10, [360_154, 5_103_798]);
