import input from "$input/2016/04.txt";
import { solve } from "$lib";

function day04() {
	const rooms = input.split("\n").map((line) => line.match(/(\w+)/g)!);

	let sum = 0;
	let id = 0;

	for (const room of rooms) {
		const checksum = room.pop()!;
		const sector = Number(room.pop()!);
		const name = room.join("");

		const counts: Record<string, number> = {};

		for (const char of name) {
			counts[char] = (counts[char] ?? 0) + 1;
		}

		const common = Object.entries(counts)
			.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
			.map((entry) => entry[0])
			.slice(0, 5)
			.join("");

		sum += common === checksum ? sector : 0;

		const isNorth = name
			.replace(/[a-z]/g, (m) =>
				String.fromCharCode(((m.charCodeAt(0) - 97 + sector) % 26) + 97),
			)
			.includes("north");

		id = isNorth ? sector : id;
	}

	return [sum, id];
}

solve("Day 4: Security Through Obscurity", day04, [278_221, 267]);
