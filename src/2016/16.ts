import input from "$input/2016/16.txt";
import { register } from "$lib/aoc";

// https://graphics.stanford.edu/%7Eseander/bithacks.html#CountBitsSetParallel
function popcnt(n: bigint) {
	n = n - ((n >> 1n) & 0x55555555n);
	n = (n & 0x33333333n) + ((n >> 2n) & 0x33333333n);

	return (((n + (n >> 4n)) & 0xf0f0f0fn) * 0x1010101n) >> 24n;
}

function parity(n: bigint) {
	const gray = n ^ (n >> 1n);
	const ones = popcnt(n & gray);

	return (ones ^ gray) & 1n;
}

export default function day16() {
	const initialLength = BigInt(input.length);

	// Parity of initial state
	let register = 0n;

	for (let i = 0, j = initialLength * 2n; i < j; i++, j--) {
		// Forward scan
		register ^= BigInt(input[i] === "1") << (BigInt(i) + 1n);

		// Reversed complement e.g.
		//  In: 00101000101111010
		// Out: 10100001011101011
		register ^= BigInt(input[i] === "0") << j;
	}

	for (let i = 1n; i < 64n; i <<= 1n) {
		register ^= register << i;
	}

	function generate(length: number) {
		// Least significant power of 2 in `length`
		const power = BigInt(length & -length);

		let checksum = "";
		let prevParity = 0n;

		for (let i = power; i <= length; i += power) {
			const dragons = i / (initialLength + 1n);

			const cycles = (i - dragons) / (initialLength * 2n);
			const prefix = (i - dragons) % (initialLength * 2n);

			let p = parity(dragons);
			p ^= cycles & initialLength;
			p ^= register >> prefix;
			// Least significant bit
			p &= 1n;

			// Inverse of p XOR prevParity
			checksum += 1n - (p ^ prevParity);
			prevParity = p;
		}

		return checksum;
	}

	return [generate(272), generate(35_651_584)];
}

register(day16, "Dragon Checksum", ["10010100110011100", "01100100101101100"]);
