import input from "$input/2017/13.txt";
import { register } from "$lib/aoc";

export default function day13() {
	const firewall = input
		.split("\n")
		.map((line) => line.split(": ").map(Number))
		.map(([depth, range]) => [depth, range, range * 2 - 2]);

	let picoseconds = 0;

	while (!firewall.every((lyr) => (picoseconds + lyr[0]) % lyr[2])) {
		picoseconds++;
	}

	return [
		firewall.reduce((sev, lyr) => (lyr[0] % lyr[2] ? sev : sev + lyr[0] * lyr[1]), 0),
		picoseconds,
	];
}

register(day13, "Packet Scanners", [1904, 3_833_504]);
