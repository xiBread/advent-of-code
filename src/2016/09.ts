import input from "$input/2016/09.txt";
import { register } from "$lib/aoc";

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

export default function day09() {
	return [decompress((_, file) => file.length), decompress(decompress)];
}

register(day09, "Explosives in Cyberspace", [97_714, 10_762_972_461]);
