import input from "$input/2015/14.txt";
import { solve } from "$lib";
import { divmod } from "$lib/math";

import { max } from "c8n";

interface Reindeer {
	speed: number;
	duration: number;
	rest: number;
	points: number;
}

const SECONDS = 2503;

function distance(r: Reindeer, time: number) {
	const [quo, rem] = divmod(time, r.duration + r.rest);

	return (quo * r.duration + Math.min(rem, r.duration)) * r.speed;
}

function day14() {
	const stats = input.split("\n").map((line) => line.match(/(\d+)/g)!.map(Number));
	const reindeer: Reindeer[] = [];

	for (const [speed, duration, rest] of stats) {
		reindeer.push({ speed, duration, rest, points: 0 });
	}

	for (let i = 1; i <= SECONDS; i++) {
		const distances = reindeer.map((r) => distance(r, i));
		const winners = reindeer.filter((r) => distance(r, i) === max(distances));

		winners.forEach((r) => r.points++);
	}

	return [max(reindeer.map((r) => distance(r, SECONDS))), max(reindeer.map((r) => r.points))];
}

solve("Day 14: Reindeer Olympics", day14, [2640, 1102]);
