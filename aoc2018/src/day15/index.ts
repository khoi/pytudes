import { run } from "../../../scripts/aoc.ts";

type Unit = { team: string; cell: number; hp: number };

function combat(
	input: string,
	elfPower: number,
	protectElves: boolean,
): number | undefined {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	const tiles = [...rows.join("")];
	const units: Unit[] = [];
	const occupied = new Map<number, Unit>();
	for (const [cell, tile] of tiles.entries()) {
		if (tile !== "E" && tile !== "G") continue;
		const unit = { team: tile, cell, hp: 200 };
		units.push(unit);
		occupied.set(cell, unit);
		tiles[cell] = ".";
	}
	const adjacent = (cell: number) => [
		cell - width,
		cell - 1,
		cell + 1,
		cell + width,
	];
	const open = (cell: number) => tiles[cell] === "." && !occupied.has(cell);
	function move(unit: Unit, enemies: Unit[]) {
		const targets = new Set(
			enemies.flatMap((enemy) => adjacent(enemy.cell)).filter(open),
		);
		const seen = new Set([unit.cell]);
		let frontier = adjacent(unit.cell)
			.filter(open)
			.map((first) => ({ cell: first, first }));
		for (const { cell } of frontier) seen.add(cell);
		while (frontier.length && targets.size) {
			let destination: (typeof frontier)[number] | undefined;
			for (const step of frontier) {
				if (
					targets.has(step.cell) &&
					(!destination || step.cell < destination.cell)
				)
					destination = step;
			}
			if (destination) {
				occupied.delete(unit.cell);
				unit.cell = destination.first;
				occupied.set(unit.cell, unit);
				return true;
			}
			const next: typeof frontier = [];
			for (const { cell, first } of frontier) {
				for (const neighbor of adjacent(cell)) {
					if (!open(neighbor) || seen.has(neighbor)) continue;
					seen.add(neighbor);
					next.push({ cell: neighbor, first });
				}
			}
			frontier = next;
		}
		return false;
	}
	function victim(unit: Unit): Unit | undefined {
		const candidates = adjacent(unit.cell)
			.map((cell) => occupied.get(cell))
			.filter((other): other is Unit => !!other && other.team !== unit.team);
		return candidates.sort((a, b) => a.hp - b.hp || a.cell - b.cell)[0];
	}
	for (let round = 0; ; round++) {
		let changed = false;
		const order = units
			.filter((unit) => unit.hp > 0)
			.sort((a, b) => a.cell - b.cell);
		for (const unit of order) {
			if (unit.hp <= 0) continue;
			const enemies = units.filter(
				(other) => other.team !== unit.team && other.hp > 0,
			);
			if (!enemies.length) {
				return (
					round * units.reduce((sum, other) => sum + Math.max(other.hp, 0), 0)
				);
			}
			let target = victim(unit);
			if (!target && move(unit, enemies)) {
				changed = true;
				target = victim(unit);
			}
			if (!target) continue;
			changed = true;
			target.hp -= unit.team === "E" ? elfPower : 3;
			if (target.hp <= 0) {
				if (protectElves && target.team === "E") return undefined;
				occupied.delete(target.cell);
			}
		}
		if (!changed) throw new Error("No combatants can reach each other");
	}
}

export function part1(input: string): number {
	return combat(input, 3, false)!;
}

export function part2(input: string): number {
	for (let power = 3; power <= 200; power++) {
		const score = combat(input, power, true);
		if (score !== undefined) return score;
	}
	throw new Error("Elves cannot win without casualties");
}

if (import.meta.main) run(import.meta.url, part1, part2);
