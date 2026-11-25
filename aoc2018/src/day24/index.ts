import { run } from "../../../scripts/aoc.ts";

type Group = {
	army: number;
	units: number;
	hp: number;
	attack: number;
	type: string;
	initiative: number;
	weak: Set<string>;
	immune: Set<string>;
};
const groupPattern =
	/^(\d+) units each with (\d+) hit points(?: \(([^)]+)\))? with an attack that does (\d+) (\w+) damage at initiative (\d+)$/;

function parseGroup(line: string, army: number): Group {
	const [, units, hp, traits, attack, type, initiative] =
		groupPattern.exec(line)!;
	const weak = new Set<string>();
	const immune = new Set<string>();
	for (const trait of traits?.split("; ") ?? []) {
		const [kind, elements] = trait.split(" to ");
		const resistance = kind === "weak" ? weak : immune;
		for (const element of elements.split(", ")) resistance.add(element);
	}
	return {
		army,
		units: Number(units),
		hp: Number(hp),
		attack: Number(attack),
		type,
		initiative: Number(initiative),
		weak,
		immune,
	};
}

function parse(input: string): Group[] {
	return input
		.trim()
		.split(/\r?\n\s*\n/)
		.flatMap((block, army) =>
			block
				.split(/\r?\n/)
				.slice(1)
				.map((line) => parseGroup(line, army)),
		);
}

const power = (g: Group) => g.units * g.attack;
const selectionOrder = (a: Group, b: Group) =>
	power(b) - power(a) || b.initiative - a.initiative;
function damage(attacker: Group, defender: Group) {
	return defender.immune.has(attacker.type)
		? 0
		: power(attacker) * (defender.weak.has(attacker.type) ? 2 : 1);
}

function battle(original: Group[], boost: number) {
	let groups = original.map((g) => ({
		...g,
		attack: g.attack + (g.army === 0 ? boost : 0),
	}));
	while (groups.some((g) => g.army !== groups[0].army)) {
		groups.sort(selectionOrder);
		const available = new Set(groups);
		const targets = new Map<Group, Group>();
		for (const attacker of groups) {
			let best: Group | undefined;
			let bestDamage = 0;
			for (const defender of available) {
				if (attacker.army === defender.army) continue;
				const amount = damage(attacker, defender);
				if (amount > bestDamage) {
					best = defender;
					bestDamage = amount;
				}
			}
			if (best) {
				targets.set(attacker, best);
				available.delete(best);
			}
		}
		let killed = 0;
		groups.sort((a, b) => b.initiative - a.initiative);
		for (const attacker of groups) {
			const defender = targets.get(attacker);
			if (!defender || attacker.units === 0) continue;
			const casualties = Math.min(
				defender.units,
				Math.floor(damage(attacker, defender) / defender.hp),
			);
			defender.units -= casualties;
			killed += casualties;
		}
		if (killed === 0)
			return {
				winner: undefined,
				units: groups.reduce((n, g) => n + g.units, 0),
			};
		groups = groups.filter((g) => g.units);
	}
	return {
		winner: groups[0].army,
		units: groups.reduce((n, g) => n + g.units, 0),
	};
}

export const part1 = (input: string) => battle(parse(input), 0).units;
export function part2(input: string) {
	const groups = parse(input);
	for (let boost = 0; ; boost++) {
		const result = battle(groups, boost);
		if (result.winner === 0) return result.units;
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
