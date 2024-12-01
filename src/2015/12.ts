import input from "$input/2015/12.txt";
import { solve } from "$lib";

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

function day12() {
	return [eval(input.replace(/[^-\d]+/g, "+") + 0), filter(JSON.parse(input))];
}

solve("Day 12: JSAbacusFramework.io", day12, [191_164, 87_842]);
