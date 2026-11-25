import { run } from "../../../scripts/aoc.ts";

function trees(rows: string[], right: number, down: number) {
	let count = 0;
	for (let y = down, x = right; y < rows.length; y += down, x += right) {
		if (rows[y][x % rows[y].length] === "#") count++;
	}
	return count;
}

export function part1(input: string) {
	return trees(input.trim().split(/\r?\n/), 3, 1);
}

export function part2(input: string) {
	const rows = input.trim().split(/\r?\n/);
	const slopes = [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	];
	return slopes.reduce(
		(product, [right, down]) => product * trees(rows, right, down),
		1,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
