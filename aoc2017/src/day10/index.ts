import { run } from "../../../scripts/aoc.ts";

import { knotHash, twist } from "../knot.ts";

export function part1(input: string, size = 256): number {
	const lengths = input.trim().split(",").filter(Boolean).map(Number);
	const [a, b] = twist(lengths, size, 1);
	return a * b;
}

export function part2(input: string): string {
	return knotHash(input.trimEnd())
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

if (import.meta.main) run(import.meta.url, part1, part2);
