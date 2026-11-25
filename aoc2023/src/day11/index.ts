import { run } from "../../../scripts/aoc.ts";

function distances(counts: number[], factor: number) {
	let sum = 0,
		preceding = 0,
		positionSum = 0,
		coordinate = 0;
	for (const occupants of counts) {
		sum += occupants * (coordinate * preceding - positionSum);
		preceding += occupants;
		positionSum += occupants * coordinate;
		coordinate += occupants === 0 ? factor : 1;
	}
	return sum;
}

export function expandedDistance(input: string, factor: number) {
	const grid = input.trim().split(/\r?\n/);
	const columns: number[] = Array(grid[0].length).fill(0);
	const rows = grid.map((line) => {
		let count = 0;
		for (let x = 0; x < line.length; x++) {
			if (line[x] === "#") {
				columns[x]++;
				count++;
			}
		}
		return count;
	});
	return distances(columns, factor) + distances(rows, factor);
}

export const part1 = (input: string) => expandedDistance(input, 2);
export const part2 = (input: string) => expandedDistance(input, 1_000_000);

if (import.meta.main) run(import.meta.url, part1, part2);
