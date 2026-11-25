import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const match = input.match(/row\s+(\d+),\s*column\s+(\d+)/i);
	if (!match) throw new Error("Expected a row and column");
	const row = Number(match[1]);
	const column = Number(match[2]);
	const diagonal = row + column - 2;
	let exponent = (diagonal * (diagonal + 1)) / 2 + column - 1;
	let value = 20151125;
	let base = 252533;
	const modulus = 33554393;
	while (exponent > 0) {
		if (exponent % 2 === 1) value = (value * base) % modulus;
		base = (base * base) % modulus;
		exponent = Math.floor(exponent / 2);
	}
	return value;
}

if (import.meta.main) run(import.meta.url, part1);
