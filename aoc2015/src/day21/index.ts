import { run } from "../../../scripts/aoc.ts";

type Item = [cost: number, damage: number, armor: number];

const weapons: Item[] = [
	[8, 4, 0],
	[10, 5, 0],
	[25, 6, 0],
	[40, 7, 0],
	[74, 8, 0],
];
const armor: Item[] = [
	[0, 0, 0],
	[13, 0, 1],
	[31, 0, 2],
	[53, 0, 3],
	[75, 0, 4],
	[102, 0, 5],
];
const rings: Item[] = [
	[0, 0, 0],
	[0, 0, 0],
	[25, 1, 0],
	[50, 2, 0],
	[100, 3, 0],
	[20, 0, 1],
	[40, 0, 2],
	[80, 0, 3],
];

function shop(input: string, mustWin: boolean): number {
	const [bossHp, bossDamage, bossArmor] = input.match(/\d+/g)!.map(Number);
	let best = mustWin ? Infinity : -Infinity;
	for (const weapon of weapons) {
		for (const chest of armor) {
			for (let i = 0; i < rings.length; i++) {
				for (const ring of rings.slice(i + 1)) {
					const items = [weapon, chest, rings[i], ring];
					const damage = items.reduce((sum, item) => sum + item[1], 0);
					const defense = items.reduce((sum, item) => sum + item[2], 0);
					const attacks = Math.ceil(bossHp / Math.max(1, damage - bossArmor));
					const survivedTurns = Math.ceil(
						100 / Math.max(1, bossDamage - defense),
					);
					if (attacks <= survivedTurns !== mustWin) continue;
					const cost = items.reduce((sum, item) => sum + item[0], 0);
					best = mustWin ? Math.min(best, cost) : Math.max(best, cost);
				}
			}
		}
	}
	if (!Number.isFinite(best))
		throw new Error("No loadout has the requested outcome");
	return best;
}

export function part1(input: string): number {
	return shop(input, true);
}

export function part2(input: string): number {
	return shop(input, false);
}

if (import.meta.main) run(import.meta.url, part1, part2);
