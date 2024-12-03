import input from "$input/2017/20.txt";
import { solve } from "$lib";
import { manhattan } from "$lib/math";

import { getOrSet } from "c8n";

interface Particle {
	id: number;
	pos: number[];
	vel: number[];
	acc: number[];
}

// 40 found after manual testing; yes, hardcoding is bad, but for the sake of
// time, I'm keeping it. Change if needed.
const TICKS = 40;

function day20() {
	const particles = input.split("\n").map((line, i) => {
		const coords = line.match(/(-?\d+)/g)!.map(Number);

		return {
			id: i,
			pos: coords.slice(0, 3),
			vel: coords.slice(3, 6),
			acc: coords.slice(6, 9),
		};
	});

	const closest = particles.sort((a, b) => {
		const aPos = manhattan(a.pos);
		const bPos = manhattan(b.pos);

		const aVel = manhattan(a.vel);
		const bVel = manhattan(b.vel);

		const aAcc = manhattan(a.acc);
		const bAcc = manhattan(b.acc);

		return aAcc - bAcc || aVel - bVel || aPos - bPos;
	});

	let remaining = particles;

	for (let i = 0; i < TICKS; i++) {
		const positions = new Map<string, Particle[]>();

		for (const particle of remaining) {
			for (let j = 0; j < 3; j++) {
				particle.vel[j] += particle.acc[j];
				particle.pos[j] += particle.vel[j];
			}

			getOrSet(positions, particle.pos.join(","), []).push(particle);
		}

		remaining = positions
			.values()
			.filter((collision) => collision.length === 1)
			.map((collision) => collision[0])
			.toArray();
	}

	return [closest[0].id, remaining.length];
}

solve("Day 20: Particle Swarm", day20, [144, 477]);
