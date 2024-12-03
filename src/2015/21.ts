import input from "$input/2015/21.txt";
import { register } from "$lib/aoc";

import { combinations } from "c8n";

interface Entity {
	hp: number;
	dmg: number;
	armor: number;
}

export default function day21() {
	const [hp, dmg, armor] = input.match(/(\d+)/gm)!.map(Number);

	const shop = {
		weapons: [
			{ cost: 8, dmg: 4, armor: 0 },
			{ cost: 10, dmg: 5, armor: 0 },
			{ cost: 25, dmg: 6, armor: 0 },
			{ cost: 40, dmg: 7, armor: 0 },
			{ cost: 74, dmg: 8, armor: 0 },
		],
		armor: [
			{ cost: 13, dmg: 0, armor: 1 },
			{ cost: 31, dmg: 0, armor: 2 },
			{ cost: 53, dmg: 0, armor: 3 },
			{ cost: 75, dmg: 0, armor: 4 },
			{ cost: 102, dmg: 0, armor: 5 },
		],
		rings: [
			// 2 "blank" rings because we can also have 0 rings
			{ cost: 0, dmg: 0, armor: 0 },
			{ cost: 0, dmg: 0, armor: 0 },
			{ cost: 25, dmg: 1, armor: 0 },
			{ cost: 50, dmg: 2, armor: 0 },
			{ cost: 100, dmg: 3, armor: 0 },
			{ cost: 20, dmg: 0, armor: 1 },
			{ cost: 40, dmg: 0, armor: 2 },
			{ cost: 80, dmg: 0, armor: 3 },
		],
	};

	function attack(player: Entity) {
		const boss = { hp, dmg, armor };

		while (boss.hp > 0 && player.hp > 0) {
			if (player.hp > 0) {
				boss.hp -= Math.max(player.dmg - boss.armor, 1);
			}

			if (boss.hp > 0) {
				player.hp -= Math.max(boss.dmg - player.armor, 1);
			}
		}

		return player.hp > 0;
	}

	let least = Infinity;
	let most = -Infinity;

	for (const weapon of shop.weapons) {
		for (const armor of shop.armor) {
			for (const [left, right] of combinations(shop.rings, 2)) {
				const gold = weapon.cost + armor.cost + left.cost + right.cost;

				const isAlive = attack({
					hp: 100,
					dmg: weapon.dmg + left.dmg + right.dmg,
					armor: armor.armor + left.armor + right.armor,
				});

				if (isAlive) {
					least = Math.min(least, gold);
				} else {
					most = Math.max(most, gold);
				}
			}
		}
	}

	return [least, most];
}

register(day21, "RPG Simulator 20XX", [121, 201]);
