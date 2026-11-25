import { run } from "../../../scripts/aoc.ts";

function rows(input: string): number[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.trim().split(/\s+/).map(Number));
}

function triangle(a: number, b: number, c: number): boolean {
	return a + b > c && b + c > a && c + a > b;
}

export function part1(input: string): number {
	return rows(input).filter(([a, b, c]) => triangle(a, b, c)).length;
}

export function part2(input: string): number {
	const sides = rows(input);
	let count = 0;
	for (let row = 0; row < sides.length; row += 3) {
		for (let col = 0; col < 3; col++) {
			if (triangle(sides[row][col], sides[row + 1][col], sides[row + 2][col]))
				count++;
		}
	}
	return count;
}

if (import.meta.main) run(import.meta.url, part1, part2);
