import input from "$input/2015/01.txt";
import { register } from "$lib/aoc";

export default function day01() {
	return [...input].reduce(
		([floor, position], char, i) => [
			floor + (char === "(" ? 1 : -1),
			floor < 0 && !position ? i : position,
		],
		[0, 0],
	);
}

register(day01, "Not Quite Lisp", [74, 1795]);
