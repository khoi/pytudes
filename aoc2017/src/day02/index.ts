import { run } from "../../../scripts/aoc.ts";

function spreadsheet(input: string): number[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((row) => row.trim().split(/\s+/).map(Number));
}

export function part1(input: string): number {
	return spreadsheet(input).reduce(
		(sum, row) => sum + Math.max(...row) - Math.min(...row),
		0,
	);
}

function quotient(row: number[]): number {
	for (let i = 0; i < row.length; i++) {
		for (const other of row.slice(i + 1)) {
			const divisor = Math.min(row[i], other);
			const dividend = Math.max(row[i], other);
			if (dividend % divisor === 0) return dividend / divisor;
		}
	}
	throw new Error("Row has no divisible pair");
}

export function part2(input: string): number {
	return spreadsheet(input).reduce((sum, row) => sum + quotient(row), 0);
}

if (import.meta.main) run(import.meta.url, part1, part2);
