import input from "$input/2015/12.txt";
import { register } from "$lib/aoc";

import { sum } from "c8n";

function filter(object: object): number {
	if (typeof object === "number") {
		return object;
	}

	if (Array.isArray(object)) {
		return sum(object.map(filter));
	}

	if (typeof object !== "object" || Object.values(object).includes("red")) {
		return 0;
	}

	return filter(Object.values(object));
}

export default function day12() {
	return [eval(input.replace(/[^-\d]+/g, "+") + 0), filter(JSON.parse(input))];
}

register(day12, "JSAbacusFramework.io", [191_164, 87_842]);
