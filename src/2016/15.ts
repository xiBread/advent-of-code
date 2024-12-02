import input from "$input/2016/15.txt";
import { solve } from "$lib";

function day15() {
	const discs = input.split("\n").map((line) => {
		const [, positions, start] = / (\d+).+?(\d+)\./.exec(line)!;

		return (time: number) => !((time + Number(start)) % Number(positions));
	});

	let time = 0;

	function wait(): number {
		while (!discs.every((disc, i) => disc(time + i + 1))) {
			time++;
		}

		return time;
	}

	const first = wait();
	discs.push((time) => !(time % 11));

	return [first, wait()];
}

solve("Day 15: Timing is Everything", day15, [148_737, 2_353_212]);
