import input from "$input/2015/24.txt";
import { register } from "$lib/aoc";

import { product, sum } from "c8n";

export default function day24() {
	const weights = input.split("\n").map(Number);

	function optimize(groups: number) {
		const weight = sum(weights) / groups;
		let qe = Infinity;

		function combinations(set: number[], n: number, target: number, size: number) {
			if (target === 0) {
				qe = Math.min(qe, product(set));
				return;
			}

			if (set.length >= size || target < 0) return;

			for (let i = n; i < weights.length; i++) {
				set.push(weights[i]);
				combinations(set, i + 1, target - weights[i], size);
				set.pop();
			}
		}

		for (let size = 1; size <= weights.length; size++) {
			combinations([], 0, weight, size);
			if (qe < Infinity) break;
		}

		return qe;
	}

	return [optimize(3), optimize(4)];
}

register(day24, "It Hangs in the Balance", [10_723_906_903, 74_850_409]);
