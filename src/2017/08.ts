import input from "$input/2017/08.txt";
import { register } from "$lib/aoc";

export default function day08() {
	const registers: Record<string, number> = {};
	// eslint-disable-next-line prefer-const
	let highest = -Infinity;

	/**
	 * The name of the game is regex metaprogramming.
	 *
	 * @example
	 * Given `b inc 5 if a > 1`:
	 *
	 * ```ts
	 * if ((registers.a ??= 0) > 1) {
	 * 	registers.b ??= 0;
	 * 	registers.b += 5;
	 *
	 * 	highest = Math.max(highest, ...Object.values(registers));
	 * }
	 * ```
	 */
	const instructions = input.replace(
		/(\w+) (inc|dec) (-?\d+) if (\w+)(.+)/gm,
		(_, $1, $2, $3, $4, $5) => `
			if ((registers.${$4} ??= 0) ${$5}) {
				registers.${$1} ??= 0;
				registers.${$1} ${$2 === "inc" ? "+=" : "-="} ${$3};

				highest = Math.max(highest, ...Object.values(registers));
			}
		`,
	);

	eval(instructions);

	return [Math.max(...Object.values(registers)), highest];
}

register(day08, "I Heard You Like Registers", [4416, 5199]);
