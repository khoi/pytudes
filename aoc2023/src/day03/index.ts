import { run } from "../../../scripts/aoc.ts";

function schematic(input: string) {
	const rows = input.trimEnd().split(/\r?\n/);
	const gears = new Map<number, number[]>();
	let parts = 0;
	for (const [y, row] of rows.entries()) {
		for (const match of row.matchAll(/\d+/g)) {
			const x = match.index;
			const value = Number(match[0]);
			let touchesSymbol = false;
			for (
				let ny = Math.max(0, y - 1);
				ny <= Math.min(rows.length - 1, y + 1);
				ny++
			) {
				for (
					let nx = Math.max(0, x - 1);
					nx <= Math.min(row.length - 1, x + match[0].length);
					nx++
				) {
					const symbol = rows[ny][nx];
					if (symbol !== "." && !/\d/.test(symbol)) touchesSymbol = true;
					if (symbol !== "*") continue;
					const key = ny * row.length + nx;
					if (!gears.has(key)) gears.set(key, []);
					gears.get(key)!.push(value);
				}
			}
			if (touchesSymbol) parts += value;
		}
	}
	return { parts, gears };
}

export const part1 = (input: string) => schematic(input).parts;

export function part2(input: string) {
	let ratios = 0;
	for (const adjacent of schematic(input).gears.values()) {
		if (adjacent.length === 2) ratios += adjacent[0] * adjacent[1];
	}
	return ratios;
}

if (import.meta.main) run(import.meta.url, part1, part2);
