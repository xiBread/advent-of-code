import input from "$input/2017/05.txt";
import { solve } from "$lib";

function day05() {
	const instructions = input.split("\n").map(Number);

	function jump(decrease = false) {
		const offsets = [...instructions];

		let steps = 0;
		let i = 0;

		while (i >= 0 && i < offsets.length) {
			steps++;

			if (decrease && offsets[i] >= 3) {
				i += offsets[i]--;
			} else {
				i += offsets[i]++;
			}
		}

		return steps;
	}

	return [jump(), jump(true)];
}

solve("Day 5: A Maze of Twisty Trampolines, All Alike", day05, [364_539, 27_477_714]);
