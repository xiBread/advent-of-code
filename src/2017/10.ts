import input from "$input/2017/10.txt";
import { register } from "$lib/aoc";

function hash(list: number[], pos: number, skip: number, lengths: number[], rounds: number) {
	if (!rounds) return list;

	for (const length of lengths) {
		const reversed = Array.from({ length }, (_, i) => list[(i + pos) % list.length]).reverse();

		for (let i = 0; i < reversed.length; i++) {
			list[(i + pos) % list.length] = reversed[i];
		}

		pos += length + skip++;
	}

	return hash(list, pos, skip, lengths, rounds - 1);
}

export default function day10() {
	const lengths = input.split(",").map(Number);

	const codes = [...input].map((c) => c.charCodeAt(0));
	codes.push(17, 31, 73, 47, 23);

	const start = [...Array.from({ length: 256 }).keys()];

	const sparse = hash([...start], 0, 0, codes, 64);
	const list = hash([...start], 0, 0, lengths, 1);

	const dense: number[] = [];

	for (let i = 0; i < sparse.length; i += 16) {
		dense.push(sparse.slice(i, i + 16).reduce((a, b) => a ^ b));
	}

	return [list[0] * list[1], dense.map((n) => n.toString(16).padStart(2, "0")).join("")];
}

register(day10, "Knot Hash", [62_238, "2b0c9cc0449507a0db3babd57ad9e8d8"]);
