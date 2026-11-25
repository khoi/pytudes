import { run } from "../../../scripts/aoc.ts";

type Operation = "turn on" | "turn off" | "toggle";

function lights(input: string, brightness: boolean): number {
	const grid = new Uint32Array(1000 * 1000);
	for (const line of input.trim().split(/\r?\n/)) {
		const [, operation, ...corners] =
			/^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/.exec(line)!;
		const [x1, y1, x2, y2] = corners.map(Number);
		for (let y = y1; y <= y2; y++) {
			for (let i = y * 1000 + x1; i <= y * 1000 + x2; i++) {
				switch (operation as Operation) {
					case "turn on":
						grid[i] = brightness ? grid[i] + 1 : 1;
						break;
					case "turn off":
						grid[i] = brightness ? Math.max(0, grid[i] - 1) : 0;
						break;
					case "toggle":
						grid[i] = brightness ? grid[i] + 2 : 1 - grid[i];
						break;
				}
			}
		}
	}
	return grid.reduce((sum, value) => sum + value, 0);
}

export function part1(input: string): number {
	return lights(input, false);
}

export function part2(input: string): number {
	return lights(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
