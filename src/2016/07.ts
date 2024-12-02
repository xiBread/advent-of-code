import input from "$input/2016/07.txt";
import { solve } from "$lib";

function day07() {
	const addresses = input.split("\n");

	let tls = 0;
	let ssl = 0;

	const hypernet = /\[[\w ]*(\w)(\w)\2\1[\w ]*\]/;
	const mirrored = /(\w)(\w)\2\1/;

	const start = /(?:^|\])[\w ]*(\w)(\w)\1.*\[[\w ]*\2\1\2/;
	const end = /\[[\w ]*(\w)(\w)\1.*\][\w ]*\2\1\2/;

	for (const addr of addresses) {
		let ip = addr.replace(/(.)\1{3,}/g, "$1 $1");
		tls += !hypernet.test(ip) && mirrored.test(ip) ? 1 : 0;

		ip = addr.replace(/(.)\1{2,}/g, "$1 $1");
		ssl += start.test(ip) || end.test(ip) ? 1 : 0;
	}

	return [tls, ssl];
}

solve("Day 7: Internet Protocol Version 7", day07, [115, 231]);
