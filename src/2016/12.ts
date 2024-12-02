import input from "$input/2016/12.txt";
import { solve } from "$lib";

function day12() {
	const instructions = input
		.split("\n")
		.map((line) => /(\w{3}) (\w+)(?: (-?\w+))?/.exec(line)!.slice(1));

	function execute(c = 0) {
		const registers: Record<string, number> = { a: 0, b: 0, c, d: 0 };

		for (let i = 0; i < instructions.length; ) {
			const [instr, x, y] = instructions[i];

			if (instr === "cpy") {
				registers[y] = Number(x) || registers[x];
			} else if (instr === "inc") {
				registers[x]++;
			} else if (instr === "dec") {
				registers[x]--;
			} else if (instr === "jnz") {
				i += registers[x] !== 0 ? Number(y) : 1;
				continue;
			}

			i++;
		}

		return registers.a;
	}

	return [execute(), execute(1)];
}

solve("Day 12: Leonardo's Monorail", day12, [318_003, 9_227_657]);
