import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	return 0;
}

export function part2(input: string): number {
	return 0;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
