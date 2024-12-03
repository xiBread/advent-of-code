import input from "$input/2017/12.txt";
import { solve } from "$lib";

function day12() {
	const directIds = input.split("\n").map((line) => line.split(">")[1].split(",").map(Number));
	const visited = new Set<number>();

	function travel(id: number): number {
		if (visited.has(id)) return 0;
		visited.add(id);

		return directIds[id].reduce((sum, next) => sum + travel(next), 1);
	}

	const programs = directIds.map((_, i) => travel(i));

	return [programs[0], programs.filter((p) => p > 0).length];
}

solve("Day 12: Digital Plumber", day12, [239, 215]);
