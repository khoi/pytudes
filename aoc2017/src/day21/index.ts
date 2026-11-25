import { run } from "../../../scripts/aoc.ts";

type Grid = string[];

function rulesFrom(input: string): Map<string, Grid> {
	const rules = new Map<string, Grid>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [from, to] = line.split(" => ");
		let pattern = from.split("/");
		const result = to.split("/");
		for (let turn = 0; turn < 4; turn++) {
			rules.set(pattern.join("/"), result);
			rules.set([...pattern].reverse().join("/"), result);
			pattern = pattern.map((_, x) =>
				pattern
					.map((row) => row[x])
					.reverse()
					.join(""),
			);
		}
	}
	return rules;
}

function tiles(grid: Grid, size: number): string[] {
	const blocks: string[] = [];
	for (let y = 0; y < grid.length; y += size) {
		for (let x = 0; x < grid.length; x += size) {
			blocks.push(
				grid
					.slice(y, y + size)
					.map((row) => row.slice(x, x + size))
					.join("/"),
			);
		}
	}
	return blocks;
}

function enhance(grid: Grid, rules: Map<string, Grid>): Grid {
	const size = grid.length % 2 === 0 ? 2 : 3;
	const across = grid.length / size;
	const rows = Array<string>(across * (size + 1)).fill("");
	for (const [i, key] of tiles(grid, size).entries()) {
		const block = rules.get(key);
		if (!block) throw new Error(`Missing rule for ${key}`);
		const top = Math.floor(i / across) * (size + 1);
		for (let j = 0; j < block.length; j++) rows[top + j] += block[j];
	}
	return rows;
}

export function pixelsAfter(input: string, rounds: number): number {
	const rules = rulesFrom(input);
	const cache = new Map<string, number>();
	function count(pattern: string, remaining: number): number {
		const key = `${remaining}:${pattern}`;
		const known = cache.get(key);
		if (known !== undefined) return known;
		let grid = pattern.split("/");
		for (let step = 0; step < Math.min(3, remaining); step++)
			grid = enhance(grid, rules);
		const result =
			remaining <= 3
				? grid.join("").split("#").length - 1
				: tiles(grid, 3).reduce(
						(sum, tile) => sum + count(tile, remaining - 3),
						0,
					);
		cache.set(key, result);
		return result;
	}
	return count(".#./..#/###", rounds);
}

export function part1(input: string): number {
	return pixelsAfter(input, 5);
}

export function part2(input: string): number {
	return pixelsAfter(input, 18);
}

if (import.meta.main) run(import.meta.url, part1, part2);
