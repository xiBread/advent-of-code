import input from "$input/2016/10.txt";
import { solve } from "$lib";

interface Bot {
	chips: Set<number>;
	lo: (value: number) => void;
	hi: (value: number) => void;
}

function balance(bot: Bot, chip: number) {
	bot.chips.add(chip);

	const min = Math.min(...bot.chips);
	const max = Math.max(...bot.chips);

	if (bot.chips.size === 2) {
		bot.lo(min);
		bot.hi(max);
	}
}

function day10() {
	const instructions = input.split("\n");

	const output: Record<string, number> = {};
	const bots: Bot[] = [];

	function give(dest: string, id: number) {
		return (value: number) =>
			dest === "output" ? (output[id] = value) : balance(bots[id], value);
	}

	for (const instr of instructions) {
		// bot (123) gives _ to (bot/output) (456) and _ to (bot/output) (789)
		const match = /(\d+).+?(\w+) (\d+).+?(\w+) (\d+)/.exec(instr);
		if (!match) continue;

		bots[Number(match[1])] = {
			chips: new Set(),
			lo: give(match[2], Number(match[3])),
			hi: give(match[4], Number(match[5])),
		};
	}

	for (const instr of instructions) {
		// value (123) goes to bot (456)
		const match = /e (\d+).+?(\d+)/.exec(instr)?.map(Number);
		if (!match) continue;

		balance(bots[match[2]], match[1]);
	}

	return [
		bots.findIndex((bot) => bot.chips.has(61) && bot.chips.has(17)),
		output[0] * output[1] * output[2],
	];
}

solve("Day 10: Balance Bots", day10, [86, 22_847]);
