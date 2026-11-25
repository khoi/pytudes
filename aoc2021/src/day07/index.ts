import { run } from "../../../scripts/aoc.ts";

function positions(input: string) {
	return input.trim().split(",").map(Number);
}

export function part1(input: string) {
	const crabs = positions(input).sort((a, b) => a - b);
	const median = crabs[Math.floor(crabs.length / 2)];
	return crabs.reduce((sum, crab) => sum + Math.abs(crab - median), 0);
}

export function part2(input: string) {
	const crabs = positions(input);
	const mean = crabs.reduce((sum, crab) => sum + crab, 0) / crabs.length;
	function fuel(target: number) {
		return crabs.reduce((sum, crab) => {
			const distance = Math.abs(crab - target);
			return sum + (distance * (distance + 1)) / 2;
		}, 0);
	}
	return Math.min(fuel(Math.floor(mean)), fuel(Math.ceil(mean)));
}

if (import.meta.main) run(import.meta.url, part1, part2);
