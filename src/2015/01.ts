import input from "$input/2015/01.txt";
import { solve } from "$lib";

function day01() {
	return [...input].reduce(
		([floor, position], char, i) => [
			floor + (char === "(" ? 1 : -1),
			floor < 0 && !position ? i : position,
		],
		[0, 0],
	);
}

solve("Day 1: Not Quite Lisp", day01, [74, 1795]);
