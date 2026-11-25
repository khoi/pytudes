import { run } from "../../../scripts/aoc.ts";

function* layers(favorite: number) {
	let frontier = [[1, 1]];
	const seen = new Set(["1,1"]);
	while (frontier.length) {
		yield frontier;
		const next: number[][] = [];
		for (const [x, y] of frontier) {
			for (const [nx, ny] of [
				[x - 1, y],
				[x + 1, y],
				[x, y - 1],
				[x, y + 1],
			]) {
				if (nx < 0 || ny < 0 || seen.has(`${nx},${ny}`)) continue;
				seen.add(`${nx},${ny}`);
				const value = nx * nx + 3 * nx + 2 * nx * ny + ny + ny * ny + favorite;
				if (value.toString(2).replaceAll("0", "").length % 2 === 0)
					next.push([nx, ny]);
			}
		}
		frontier = next;
	}
}

export function part1(input: string, targetX = 31, targetY = 39) {
	let distance = 0;
	for (const frontier of layers(Number(input.trim()))) {
		if (frontier.some(([x, y]) => x === targetX && y === targetY))
			return distance;
		distance++;
	}
	throw new Error("Target is unreachable");
}

export function part2(input: string, limit = 50) {
	let count = 0;
	let depth = 0;
	for (const frontier of layers(Number(input.trim()))) {
		count += frontier.length;
		if (depth++ === limit) break;
	}
	return count;
}

if (import.meta.main) run(import.meta.url, part1, part2);
