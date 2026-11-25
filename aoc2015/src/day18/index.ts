import { run } from "../../../scripts/aoc.ts";

function animate(input: string, steps: number, stuck: boolean): number {
	let grid = input
		.trim()
		.split(/\r?\n/)
		.map((line) => Array.from(line, (light) => Number(light === "#")));
	const height = grid.length;
	const width = grid[0].length;
	function lightCorners() {
		if (stuck) {
			for (const row of [grid[0], grid[height - 1]])
				row[0] = row[width - 1] = 1;
		}
	}
	lightCorners();
	for (let step = 0; step < steps; step++) {
		grid = grid.map((row, y) =>
			row.map((alive, x) => {
				let neighbors = -alive;
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++)
						neighbors += grid[y + dy]?.[x + dx] ?? 0;
				}
				return Number(neighbors === 3 || (neighbors === 2 && alive === 1));
			}),
		);
		lightCorners();
	}
	return grid.reduce((sum, row) => sum + row.reduce((a, b) => a + b, 0), 0);
}

export function part1(input: string, steps = 100): number {
	return animate(input, steps, false);
}

export function part2(input: string, steps = 100): number {
	return animate(input, steps, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
