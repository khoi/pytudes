import { run } from "../../../scripts/aoc.ts";

export function part1(input: string) {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	let grid = [...rows.join("")];
	for (let step = 1; ; step++) {
		let moved = false;
		for (const herd of [">", "v"]) {
			const next = [...grid];
			for (let i = 0; i < grid.length; i++) {
				if (grid[i] !== herd) continue;
				const target =
					herd === "v"
						? (i + width) % grid.length
						: i % width === width - 1
							? i + 1 - width
							: i + 1;
				if (grid[target] !== ".") continue;
				next[target] = herd;
				next[i] = ".";
				moved = true;
			}
			grid = next;
		}
		if (!moved) return step;
	}
}

if (import.meta.main) run(import.meta.url, part1);
