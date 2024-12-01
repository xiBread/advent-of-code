import input from "$input/2015/23.txt";
import { solve } from "$lib";

function day23() {
	const instructions = input
		.split("\n")
		.map((line) => /(\w{3}) ([-+]?\w+)(?:.+?([-+]\d+))?/.exec(line)!.slice(1));

	function execute(a = 0) {
		const registers: Record<string, number> = { a, b: 0 };

		for (let i = 0; i < instructions.length; ) {
			const [instr, r, offset] = instructions[i];

			if (instr === "hlf") {
				registers[r] /= 2;
				i++;
			} else if (instr === "tpl") {
				registers[r] *= 3;
				i++;
			} else if (instr === "inc") {
				registers[r]++;
				i++;
			} else if (instr === "jmp") {
				i += Number(r);
			} else if (instr === "jie") {
				i += registers[r] % 2 === 0 ? Number(offset) : 1;
			} else if (instr === "jio") {
				i += registers[r] === 1 ? Number(offset) : 1;
			}
		}

		return registers.b;
	}

	return [execute(), execute(1)];
}

solve("Day 23: Opening the Turing Lock", day23, [170, 247]);
