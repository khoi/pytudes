import { run } from "../../../scripts/aoc.ts";

function settle(input: string) {
	const bricks = input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [a, b] = line.split("~").map((p) => p.split(",").map(Number));
			return {
				min: a.map((n, i) => Math.min(n, b[i])),
				max: a.map((n, i) => Math.max(n, b[i])),
			};
		})
		.sort((a, b) => a.min[2] - b.min[2]);
	const columns = new Map<string, { z: number; brick: number }>();
	const supports: number[][] = [];
	const children: number[][] = bricks.map(() => []);
	for (const [id, { min, max }] of bricks.entries()) {
		const footprint: string[] = [];
		let level = 0;
		for (let x = min[0]; x <= max[0]; x++)
			for (let y = min[1]; y <= max[1]; y++) {
				const key = x + "," + y;
				footprint.push(key);
				level = Math.max(level, columns.get(key)?.z ?? 0);
			}
		const under = new Set<number>();
		const top = { z: level + 1 + max[2] - min[2], brick: id };
		for (const key of footprint) {
			const below = columns.get(key);
			if (below?.z === level) under.add(below.brick);
			columns.set(key, top);
		}
		supports[id] = [...under];
		for (const brick of under) children[brick].push(id);
	}
	return { supports, children };
}

export function part1(input: string): number {
	const { supports, children } = settle(input);
	return children.filter((above) =>
		above.every((id) => supports[id].length > 1),
	).length;
}

export function part2(input: string): number {
	const { supports, children } = settle(input);
	let sum = 0;
	for (const id of children.keys()) {
		const fallen = new Set([id]);
		for (const brick of fallen)
			for (const above of children[brick])
				if (supports[above].every((below) => fallen.has(below)))
					fallen.add(above);
		sum += fallen.size - 1;
	}
	return sum;
}

if (import.meta.main) run(import.meta.url, part1, part2);
