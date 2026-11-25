import { run } from "../../../scripts/aoc.ts";

import { hash } from "node:crypto";

function mine(input: string, zeros: number): number {
	const key = input.trim();
	const prefix = "0".repeat(zeros);
	for (let suffix = 1; ; suffix++) {
		if (hash("md5", key + suffix).startsWith(prefix)) return suffix;
	}
}

export function part1(input: string): number {
	return mine(input, 5);
}

export function part2(input: string): number {
	return mine(input, 6);
}

if (import.meta.main) run(import.meta.url, part1, part2);
