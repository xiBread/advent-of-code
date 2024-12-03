import input from "$input/2015/16.txt";
import { register } from "$lib/aoc";

export default function day16() {
	const aunts = input.split("\n").map((line) => line.replace(/:/g, ""));

	const tape = {
		children: 3,
		cats: 7,
		samoyeds: 2,
		pomeranians: 3,
		akitas: 0,
		vizslas: 0,
		goldfish: 5,
		trees: 3,
		cars: 2,
		perfumes: 1,
	};

	const a: string[] = [];
	const b: string[] = [];

	for (const [item, value] of Object.entries(tape)) {
		/**
		 * Tests for "cats", "trees", "pomeranians", and "goldfish":
		 *
		 * (?=.+ts|tr).+(s) -> [cat](s), [tree](s)
		 * .o -> [p](o)meranians, [g](o)ldfish
		 *
		 * Capture 's' to determine if lower bound for "cats" or "trees"
		 */
		const gt = /^(?:(?=.+ts|tr).+(s)|.o)/.exec(item);
		const exclude = `${item} [^${value}]`;

		a.push(exclude);

		if (gt) {
			b.push(`${item} ${gt[1] ? `[0-${value}]` : `([${value}-9]|10)`}`);
		} else {
			b.push(exclude);
		}
	}

	function find(matcher: string[]) {
		const list = aunts.find((list) => !new RegExp(matcher.join("|")).test(list))!;
		return Number(list.split(" ")[1]);
	}

	return [find(a), find(b)];
}

register(day16, "Aunt Sue", [40, 241]);
