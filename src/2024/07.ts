import input from "$input/2024/07.txt";
import { register } from "$lib/aoc";

function evaluate(test: number, numbers: number[], concat: boolean) {
	if (!numbers.length) return !test;

	const tail = numbers.at(-1)!;
	const head = numbers.slice(0, -1);

	if (evaluate(test - tail, head, concat)) {
		return true;
	}

	if (test % tail === 0 && evaluate(test / tail, head, concat)) {
		return true;
	}

	if (concat) {
		const tens = 10 ** (Math.floor(Math.log10(tail)) + 1);
		const next = test - tail;

		if (next % tens === 0 && evaluate(next / tens, head, concat)) {
			return true;
		}
	}

	return false;
}

export default function day07() {
	const equations = input.split("\n").map((line) => line.match(/\d+/g)!.map(Number));

	function calibrate(concat = false) {
		return equations
			.filter(([test, ...numbers]) => evaluate(test, numbers, concat))
			.reduce((sum, eq) => sum + eq[0], 0);
	}

	return [calibrate(), calibrate(true)];
}

register(day07, "Bridge Repair", [4_998_764_814_652, 37_598_910_447_546]);
