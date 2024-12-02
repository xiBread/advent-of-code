import input from "$input/2016/09.txt";
import { solve } from "$lib";

type Fn = (fn: Fn, file: string) => number;

function decompress(fn: Fn, file = input) {
	let length = 0;

	while (file.length) {
		if (file[0] === "(") {
			const [, subsequent, repeat, rest] = /^\((\d+)x(\d+)\)(.*)$/.exec(file)!;

			length += fn(fn, rest.slice(0, Number(subsequent))) * Number(repeat);
			file = rest.slice(Number(subsequent));
		} else {
			length++;
			file = file.slice(1);
		}
	}

	return length;
}

function day09() {
	return [decompress((_, file) => file.length), decompress(decompress)];
}

solve("Day 9: Explosives in Cyberspace", day09, [97_714, 10_762_972_461]);
