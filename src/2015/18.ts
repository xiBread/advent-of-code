import input from "$input/2015/18.txt";
import { register } from "$lib/aoc";

import { sum } from "c8n";

const HEIGHT = 100;
const WIDTH = 100;
const STEPS = 100;

export default function day18() {
	const grid = input.split(/\n|/);

	function setCorners(lights: number[]) {
		lights[0] = 1;
		lights[WIDTH - 1] = 1;
		lights[WIDTH * HEIGHT - WIDTH] = 1;
		lights[WIDTH * HEIGHT - 1] = 1;
	}

	function animate(corners = false) {
		let lights = grid.map<number>((light) => (light === "#" ? 1 : 0));
		if (corners) setCorners(lights);

		for (let i = 0; i < STEPS; i++) {
			const toggled = Array.from(lights, () => 0);
			if (corners) setCorners(toggled);

			for (let y = 0; y < HEIGHT; y++) {
				for (let x = 0; x < WIDTH; x++) {
					const pos = WIDTH * x + y;
					let on = lights[pos] ? -1 : 0;

					for (let dy = 0; dy < 3; dy++) {
						for (let dx = 0; dx < 3; dx++) {
							const nx = x + dx - 1;
							const ny = y + dy - 1;

							if (
								nx >= 0 &&
								nx < WIDTH &&
								ny >= 0 &&
								ny < HEIGHT &&
								lights[WIDTH * nx + ny] === 1
							) {
								on++;
							}
						}
					}

					if ((lights[pos] && (on === 2 || on === 3)) || on === 3) {
						toggled[pos] = 1;
					}
				}
			}

			lights = toggled;
		}

		return sum(lights);
	}

	return [animate(), animate(true)];
}

register(day18, "Like a GIF For Your Yard", [768, 781]);
