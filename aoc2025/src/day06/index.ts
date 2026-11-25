import { run } from "../../../scripts/aoc.ts";

function total(input: string, columnwise: boolean): number {
	const rows = input.trimEnd().split(/\r?\n/);
	const operators = rows.pop()!;
	const width = Math.max(operators.length, ...rows.map((row) => row.length));
	let sum = 0;
	let start = 0;

	for (let col = 0; col <= width; col++) {
		if (operators[col]?.trim() || rows.some((row) => row[col]?.trim()))
			continue;
		if (start < col) {
			const numbers = columnwise
				? Array.from({ length: col - start }, (_, offset) =>
						Number(rows.map((row) => row[start + offset]?.trim()).join("")),
					)
				: rows.map((row) => Number(row.slice(start, col)));
			const op = operators.slice(start, col).trim();
			sum +=
				op === "+"
					? numbers.reduce((a, b) => a + b)
					: numbers.reduce((a, b) => a * b);
		}
		start = col + 1;
	}
	return sum;
}

export function part1(input: string): number {
	return total(input, false);
}

export function part2(input: string): number {
	return total(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
