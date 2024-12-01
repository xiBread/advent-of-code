import input from "$input/2015/19.txt";
import { solve } from "$lib";

function day19() {
	const replacements = input
		.split("\n\n")[0]
		.split("\n")
		.map((line) => line.split(" => "));

	const molecule = input.split("\n").at(-1)!;
	const distinct = new Set<string>();

	for (const [atom, replacement] of replacements) {
		for (let i = molecule.length; i--; ) {
			if (molecule.slice(i, i + atom.length) === atom) {
				distinct.add(molecule.slice(0, i) + replacement + molecule.slice(i + atom.length));
			}
		}
	}

	const steps =
		molecule.match(/[A-Z]/g)!.length -
		molecule.match(/Ar|Rn/g)!.length -
		molecule.match(/Y/g)!.length * 2 -
		1;

	return [distinct.size, steps];
}

solve("Day 19: Medicine for Rudolph", day19, [576, 207]);
