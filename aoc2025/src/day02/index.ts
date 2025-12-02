import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function isInvalid(n: number): boolean {
	if (!Number.isInteger(n) || n <= 0) return false;
	const s = String(n);
	if (s.length % 2 !== 0) return false;
	const half = s.length / 2;
	return s.slice(0, half) === s.slice(half);
}

function isInvalid2(n: number): boolean {
	if (!Number.isInteger(n) || n <= 0) return false;
	const s = String(n);
	if (s.length < 2) return false;
	return (s + s).indexOf(s, 1) < s.length;
}

export function part1(input: string): number {
	const ranges = input.split(",").map((range) => range.split("-").map(Number));
	let sum = 0;
	for (const [i, j] of ranges) {
		for (let k = i; k <= j; k++) {
			if (!isInvalid(k)) continue;
			sum += k;
		}
	}
	return sum;
}

export function part2(input: string): number {
	const ranges = input.split(",").map((range) => range.split("-").map(Number));
	let sum = 0;
	for (const [i, j] of ranges) {
		for (let k = i; k <= j; k++) {
			if (!isInvalid2(k)) continue;
			sum += k;
		}
	}
	return sum;
}

if (import.meta.vitest) {
	const { describe, expect, it } = import.meta.vitest;

	describe("Day 02", () => {
		it("part1 - sample", () => {
			expect(part1(sample)).toBe(1227775554);
			expect(part1(input)).toBe(52316131093);
		});

		it("part2 - sample", () => {
			expect(part2(sample)).toBe(4174379265);
			expect(part2(input)).toBe(69564213293);
		});
	});
}
