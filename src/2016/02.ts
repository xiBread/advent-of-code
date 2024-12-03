import input from "$input/2016/02.txt";
import { register } from "$lib/aoc";

enum Layout {
	Square,
	Diamond,
}

export default function day02() {
	const keypad: Record<string, string[]> = {
		U: ["123123456", "121452349678B"],
		D: ["456789789", "36785ABC9ADCD"],
		L: ["112445778", "122355678AABD"],
		R: ["233566899", "134467899BCCD"],
	};

	const instructions = input.split("\n");

	function decode(layout: Layout) {
		let current = "5";
		let code = "";

		for (const line of instructions) {
			for (const direction of line) {
				current = keypad[direction][layout][Number.parseInt(current, 16) - 1];
			}

			code += current;
		}

		return Number(code) || code;
	}

	return [decode(Layout.Square), decode(Layout.Diamond)];
}

register(day02, "Bathroom Security", [44_558, "6BBAD"]);
