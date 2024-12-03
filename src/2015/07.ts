import input from "$input/2015/07.txt";
import { register } from "$lib/aoc";

export default function day07() {
	let signals = {};

	const template = "const $4 = _ => signals.$4 ??= $1() $2 $3()";
	const ops: Record<string, string> = { N: "~", A: "&", O: "|", L: "<<", R: ">>" };

	// Using `p LSHIFT 2 -> q` as an example:
	const circuits = input
		// 1. Prefix keywords with an underscore
		//    _do, _if, _in
		.replace(/(do|i[fn])/g, "_$1")
		// 2. Convert instructions to functions:
		//    const q = _ => signals.q ??= p() L 2()
		.replace(/(\w*?) ?([A-Z])?\w*? ?(\w+) -> (\w+)/g, template)
		// 3. Replace number and empty calls with itself:
		//    const q = _ => signals.q ??= p() L 2
		.replace(/(?:(\d+)| )\(\)/g, "$1")
		// 4. Replace operations with their symbols:
		//    const q = _ => signals.q ??= p() >> 2
		.replace(/[A-Z]/g, ($0) => ops[$0]);

	const connect = () => eval(`${circuits}; a()`);

	const a = connect();
	signals = { b: a };

	return [a, connect()];
}

register(day07, "Some Assembly Required", [46_065, 14_134]);
