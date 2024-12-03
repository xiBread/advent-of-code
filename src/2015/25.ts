import input from "$input/2015/25.txt";
import { register } from "$lib/aoc";

// Separators don't make sense logically, but the number is obviously the
// date 2015/11/25, so I figured it'd look nicer to display it as such.
const FIRST_CODE = 2015_11_25;

const MULTIPLIER = 252_533;
const DIVISOR = 33_554_393;

function modexp(base: number, exp: number, mod: number) {
	let n = 1;

	while (exp > 0) {
		if (exp % 2 === 1) {
			n = (n * base) % mod;
		}

		base = (base * base) % mod;
		exp = Math.floor(exp / 2);
	}

	return n;
}

export default function day25() {
	const [row, col] = input.match(/\d+/g)!.map(Number);

	return (
		(FIRST_CODE * modexp(MULTIPLIER, ((row + col - 1) * (row + col)) / 2 - row, DIVISOR)) %
		DIVISOR
	);
}

register(day25, "Let It Snow", 9_132_360);
