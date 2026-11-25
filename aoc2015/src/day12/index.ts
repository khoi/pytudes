import { run } from "../../../scripts/aoc.ts";

function sum(value: unknown, ignoreRed: boolean): number {
	if (typeof value === "number") return value;
	if (!value || typeof value !== "object") return 0;
	const children: unknown[] = Object.values(value);
	if (ignoreRed && !Array.isArray(value) && children.includes("red")) return 0;
	return children.reduce<number>(
		(total, child) => total + sum(child, ignoreRed),
		0,
	);
}

export function part1(input: string): number {
	return sum(JSON.parse(input), false);
}

export function part2(input: string): number {
	return sum(JSON.parse(input), true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
