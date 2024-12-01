import input from "$input/2015/11.txt";
import { solve } from "$lib";

function increasing(password: string) {
	for (let i = 0; i < password.length - 3; i++) {
		if (
			password.charCodeAt(i) === password.charCodeAt(i + 1) - 1 &&
			password.charCodeAt(i) === password.charCodeAt(i + 2) - 2
		) {
			return true;
		}
	}

	return false;
}

const confusing = /[iol]/;
const pairs = /(.)\1.*(.)\2/;

function next(password: string) {
	do {
		const next = [...password].reverse();

		for (let i = 0; i < password.length; i++) {
			let code = next[i].charCodeAt(0) + 1;
			code += code === 105 || code === 108 || code === 111 ? 1 : 0;

			if (code > 122) {
				next[i] = "a";
				continue;
			}

			next[i] = String.fromCharCode(code);
			break;
		}

		password = next.reverse().join("");
	} while (!increasing(password) || confusing.test(password) || !pairs.test(password));

	return password;
}

function day11() {
	const first = next(input);
	return [first, next(first)];
}

solve("Day 11: Corporate Policy", day11, ["vzbxxyzz", "vzcaabcc"]);
