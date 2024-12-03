import input from "$input/2017/16.txt";
import { register } from "$lib/aoc";

export default function day16() {
	const moves = input.split(",");

	const program = [..."abcdefghijklmnop"];
	const programs: string[] = [];

	function dance(move: string) {
		if (move[0] === "s") {
			const x = Number(move.slice(1));

			program.unshift(...program.splice(-x, x));
		} else if (move[0] === "x") {
			const [a, b] = move.slice(1).split("/");

			// @ts-expect-error - Saves ~20ms by not mapping indices into numbers
			[program[a], program[b]] = [program[b], program[a]];
		} else {
			const [a, b] = move.slice(1).split("/");

			const i = program.indexOf(a);
			const j = program.indexOf(b);

			[program[i], program[j]] = [b, a];
		}
	}

	// We don't actually need to perform a billion dances, just loop until we
	// reach the initial state again
	while (!programs.includes("abcdefghijklmnop")) {
		for (const move of moves) dance(move);
		programs.push(program.join(""));
	}

	return [programs[0], programs[(1e9 % programs.length) - 1]];
}

register(day16, "Permutation Promenade", ["hmefajngplkidocb", "fbidepghmjklcnoa"]);
