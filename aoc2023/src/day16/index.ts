import { run } from "../../../scripts/aoc.ts";

const dx = [1, 0, -1, 0],
	dy = [0, 1, 0, -1];

function energized(
	grid: string[],
	x: number,
	y: number,
	direction: number,
): number {
	const width = grid[0].length,
		height = grid.length;
	const visited = new Uint8Array(width * height);
	const beams = [(y * width + x) * 4 + direction];
	let count = 0;
	while (beams.length) {
		const state = beams.pop()!;
		const cell = state >> 2,
			incoming = state & 3;
		if (visited[cell] & (1 << incoming)) continue;
		if (!visited[cell]) count++;
		visited[cell] |= 1 << incoming;
		const x = cell % width,
			y = Math.floor(cell / width);
		const tile = grid[y][x];
		const outgoing =
			tile === "/"
				? [3 - incoming]
				: tile === "\\"
					? [incoming ^ 1]
					: tile === "|" && !(incoming & 1)
						? [1, 3]
						: tile === "-" && incoming & 1
							? [0, 2]
							: [incoming];
		for (const direction of outgoing) {
			const nx = x + dx[direction],
				ny = y + dy[direction];
			if (nx >= 0 && ny >= 0 && nx < width && ny < height)
				beams.push((ny * width + nx) * 4 + direction);
		}
	}
	return count;
}

export function part1(input: string): number {
	return energized(input.trim().split(/\r?\n/), 0, 0, 0);
}

export function part2(input: string): number {
	const grid = input.trim().split(/\r?\n/);
	const width = grid[0].length,
		height = grid.length;
	let best = 0;
	for (let x = 0; x < width; x++)
		best = Math.max(
			best,
			energized(grid, x, 0, 1),
			energized(grid, x, height - 1, 3),
		);
	for (let y = 0; y < height; y++)
		best = Math.max(
			best,
			energized(grid, 0, y, 0),
			energized(grid, width - 1, y, 2),
		);
	return best;
}

if (import.meta.main) run(import.meta.url, part1, part2);
