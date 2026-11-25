import { run } from "../../../scripts/aoc.ts";

type State = {
	hp: number;
	mana: number;
	boss: number;
	shield: number;
	poison: number;
	recharge: number;
};

const spells = [
	{ cost: 53, damage: 4, healing: 0 },
	{ cost: 73, damage: 2, healing: 2 },
	{ cost: 113, effect: "shield", turns: 6 },
	{ cost: 173, effect: "poison", turns: 6 },
	{ cost: 229, effect: "recharge", turns: 5 },
] as const;

function tick(state: State) {
	if (state.shield > 0) state.shield--;
	if (state.poison > 0) {
		state.poison--;
		state.boss -= 3;
	}
	if (state.recharge > 0) {
		state.recharge--;
		state.mana += 101;
	}
}

function battle(
	input: string,
	hard: boolean,
	hp: number,
	mana: number,
): number {
	const [boss, damage] = input.match(/\d+/g)!.map(Number);
	const turns: State[][] = [
		[{ hp, mana, boss, shield: 0, poison: 0, recharge: 0 }],
	];
	const visited = new Set<string>();
	let minimum = Infinity;
	for (let spent = 0; spent < turns.length && spent < minimum; spent++) {
		for (const turn of turns[spent] ?? []) {
			const key = [
				turn.hp,
				turn.mana,
				turn.boss,
				turn.shield,
				turn.poison,
				turn.recharge,
			].join(",");
			if (visited.has(key)) continue;
			visited.add(key);
			if (hard && --turn.hp <= 0) continue;
			tick(turn);
			if (turn.boss <= 0) return spent;
			for (const spell of spells) {
				if (turn.mana < spell.cost || spent + spell.cost >= minimum) continue;
				const next = { ...turn, mana: turn.mana - spell.cost };
				if ("effect" in spell) {
					if (next[spell.effect] > 0) continue;
					next[spell.effect] = spell.turns;
				} else {
					next.boss -= spell.damage;
					next.hp += spell.healing;
				}
				tick(next);
				const cost = spent + spell.cost;
				if (next.boss <= 0) {
					minimum = Math.min(minimum, cost);
					continue;
				}
				next.hp -= Math.max(1, damage - (next.shield > 0 ? 7 : 0));
				if (next.hp > 0) (turns[cost] ??= []).push(next);
			}
		}
	}
	if (!Number.isFinite(minimum)) throw new Error("No winning spell sequence");
	return minimum;
}

export function part1(input: string, hp = 50, mana = 500): number {
	return battle(input, false, hp, mana);
}

export function part2(input: string, hp = 50, mana = 500): number {
	return battle(input, true, hp, mana);
}

if (import.meta.main) run(import.meta.url, part1, part2);
