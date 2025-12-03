import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function parse(input: string): number[][] {
	return input.split("\n").map((line) => line.split("").map(Number));
}

function dp(bank: number[], k: number): number {
	const n = bank.length;
	let prevSuffix = new Array(n + 1).fill(-Infinity);
	for (let i = n - 1; i >= 0; i--) {
		prevSuffix[i] = Math.max(prevSuffix[i + 1], bank[i]);
	}
	for (let d = 2; d <= k; d++) {
		const multiplier = 10 ** (d - 1);
		const currSuffix = new Array(n + 1).fill(-Infinity);
		for (let i = n - 1; i >= 0; i--) {
			currSuffix[i] = Math.max(
				currSuffix[i + 1],
				bank[i] * multiplier + prevSuffix[i + 1],
			);
		}
		prevSuffix = currSuffix;
	}

	return prevSuffix[0];
}

export function part1(str: string): number {
	const banks = parse(str);
	return banks.reduce((sum, bank) => sum + dp(bank, 2), 0);
}

export function part2(str: string): number {
	const banks = parse(str);
	return banks.reduce((sum, bank) => sum + dp(bank, 12), 0);
}

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe("Day 03", () => {
		it("part1 - sample", () => {
			expect(part1(sample)).toBe(357);
			expect(part1(input)).toBe(17321);
		});

		it("part2 - sample", () => {
			expect(part2(sample)).toBe(3121910778619);
			expect(part2(input)).toBe(171989894144198);
		});
	});
}
