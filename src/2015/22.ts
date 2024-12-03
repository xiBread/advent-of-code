import input from "$input/2015/22.txt";
import { register } from "$lib/aoc";

interface Turn {
	boss: { hp: number; dmg: number };
	player: { hp: number; mana: number; next: boolean };
	effects: Record<string, number>;
	armor: number;
	spent: number;
}

export default function day22() {
	const [hp, dmg] = input.match(/(\d+)/gm)!.map(Number);

	const spells = {
		missle: { cost: 53, damage: 4, heal: 0, armor: 0, mana: 0, turns: 0 },
		drain: { cost: 73, damage: 2, heal: 2, armor: 0, mana: 0, turns: 0 },
		shield: { cost: 113, damage: 0, heal: 0, armor: 7, mana: 0, turns: 6 },
		poison: { cost: 173, damage: 3, heal: 0, armor: 0, mana: 0, turns: 6 },
		recharge: { cost: 229, damage: 0, heal: 0, armor: 0, mana: 101, turns: 5 },
	};

	function play(hard = false) {
		const seen = new Map<string, number>();
		let mana = Infinity;

		const turns: Turn[] = [
			{
				boss: { hp, dmg },
				player: { hp: 50, mana: 500, next: true },
				effects: { shield: 0, poison: 0, recharge: 0 },
				armor: 0,
				spent: 0,
			},
		];

		while (turns.length) {
			const turn = turns.pop()!;

			if (turn.player.next && hard) {
				turn.player.hp--;
			}

			turn.armor = turn.effects.shield-- > 0 ? spells.shield.armor : 0;

			if (turn.effects.poison-- > 0) {
				turn.boss.hp -= spells.poison.damage;
			}

			if (turn.effects.recharge-- > 0) {
				turn.player.mana += spells.recharge.mana;
			}

			if (turn.player.hp <= 0 || turn.spent >= mana) {
				continue;
			}

			if (turn.boss.hp <= 0) {
				mana = Math.min(mana, turn.spent);
				continue;
			}

			const stats = `${turn.player.hp}:${turn.player.mana}`;

			if (seen.has(stats) && seen.get(stats)! <= turn.spent) {
				continue;
			}

			seen.set(stats, turn.spent);

			if (turn.player.next) {
				turn.player.next = false;

				for (const [name, spell] of Object.entries(spells)) {
					if (spell.cost >= turn.player.mana) continue;

					const next: Turn = JSON.parse(JSON.stringify(turn));
					next.player.mana -= spell.cost;
					next.spent += spell.cost;

					if (!spell.turns) {
						next.boss.hp -= spell.damage;
						next.player.hp += spell.heal;
					} else {
						if (next.effects[name] > 0) continue;
						next.effects[name] = spell.turns;
					}

					turns.push(next);
				}
			} else {
				turn.player.next = true;
				turn.player.hp -= Math.max(1, turn.boss.dmg - turn.armor);

				turns.push(turn);
			}
		}

		return mana;
	}

	return [play(), play(true)];
}

register(day22, "Wizard Simulator 20XX", [1824, 1937]);
