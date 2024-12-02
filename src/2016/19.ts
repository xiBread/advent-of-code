import input from "$input/2016/19.txt";
import { solve } from "$lib";

function day19() {
	const elves = Number(input);
	let i = 1;

	for (; i * 3 < elves; i *= 3);

	return [Number.parseInt(elves.toString(2).slice(1) + 1, 2), elves - i];
}

solve("Day 19: An Elephant Named Joseph", day19, [1_841_611, 1_423_634]);
