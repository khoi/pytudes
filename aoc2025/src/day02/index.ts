import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	return 0;
}

export function part2(input: string): number {
	return 0;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe("Day 02", () => {
		it("part1 - sample", () => {
			expect(part1(sample)).toBe(1); // TODO: update with correct answer
		});

		it("part2 - sample", () => {
			expect(part2(sample)).toBe(1); // TODO: update with correct answer
		});
	});
}
