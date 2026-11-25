import { run } from "../../../scripts/aoc.ts";

const directions = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0],
];
const bit = (x: number, y: number) => 1 << (5 * y + x);
const center = bit(2, 2);

function board(input: string): number {
	const cells = input.trim().replace(/\s/g, "");
	if (cells.length !== 25) throw new Error("Expected a five-by-five bug grid");
	return [...cells].reduce(
		(mask, cell, i) => (cell === "#" ? mask | (1 << i) : mask),
		0,
	);
}

type Neighbor = [level: number, mask: number];

function neighborhoods(recursive: boolean): Neighbor[][] {
	return Array.from({ length: 25 }, (_, i) => {
		const x = i % 5,
			y = Math.floor(i / 5);
		const neighbors: Neighbor[] = [];
		for (const [dx, dy] of directions) {
			const nx = x + dx,
				ny = y + dy;
			if (nx < 0 || nx > 4 || ny < 0 || ny > 4) {
				if (recursive) neighbors.push([-1, bit(2 + dx, 2 + dy)]);
			} else if (recursive && nx === 2 && ny === 2) {
				for (let t = 0; t < 5; t++)
					neighbors.push([
						1,
						bit(dx === 0 ? t : 2 - 2 * dx, dy === 0 ? t : 2 - 2 * dy),
					]);
			} else neighbors.push([0, bit(nx, ny)]);
		}
		return neighbors;
	});
}

function evolve(
	levels: Map<number, number>,
	depth: number,
	neighbors: Neighbor[][],
): number {
	let result = 0;
	const original = levels.get(depth) ?? 0;
	for (let i = 0; i < 25; i++) {
		let count = 0;
		for (const [offset, mask] of neighbors[i]) {
			if ((levels.get(depth + offset) ?? 0) & mask) count++;
		}
		if (count === 1 || (count === 2 && !(original & (1 << i))))
			result |= 1 << i;
	}
	return result;
}

export function part1(input: string): number {
	const neighbors = neighborhoods(false),
		seen = new Set<number>();
	let bugs = board(input);
	while (!seen.has(bugs)) {
		seen.add(bugs);
		bugs = evolve(new Map([[0, bugs]]), 0, neighbors);
	}
	return bugs;
}

export function part2(input: string, minutes = 200): number {
	const neighbors = neighborhoods(true);
	let levels = new Map([[0, board(input) & ~center]]);
	for (let t = 0; t < minutes && levels.size; t++) {
		const next = new Map<number, number>();
		const min = Math.min(...levels.keys()) - 1,
			max = Math.max(...levels.keys()) + 1;
		for (let depth = min; depth <= max; depth++) {
			const bugs = evolve(levels, depth, neighbors) & ~center;
			if (bugs) next.set(depth, bugs);
		}
		levels = next;
	}
	let total = 0;
	for (let bugs of levels.values()) {
		while (bugs) {
			total++;
			bugs &= bugs - 1;
		}
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
