import { run } from "../../../scripts/aoc.ts";

function forest(input: string) {
	const rows = input.trim().split(/\r?\n/);
	let visibleCount = 0;
	let bestScore = 0;
	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[y].length; x++) {
			let visible = false;
			let score = 1;
			for (const [dx, dy] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			]) {
				let distance = 0;
				let blocked = false;
				for (
					let a = x + dx, b = y + dy;
					rows[b]?.[a] !== undefined;
					a += dx, b += dy
				) {
					distance++;
					if (rows[b][a] >= rows[y][x]) {
						blocked = true;
						break;
					}
				}
				if (!blocked) visible = true;
				score *= distance;
			}
			if (visible) visibleCount++;
			bestScore = Math.max(bestScore, score);
		}
	}
	return { visibleCount, bestScore };
}

export function part1(input: string) {
	return forest(input).visibleCount;
}

export function part2(input: string) {
	return forest(input).bestScore;
}

if (import.meta.main) run(import.meta.url, part1, part2);
