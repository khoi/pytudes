import { run } from "../../../scripts/aoc.ts";

const fuel = (mass: number) => Math.floor(mass / 3) - 2;
const masses = (input: string) => input.trim().split(/\s+/).map(Number);

export function part1(input: string): number {
	return masses(input).reduce((total, mass) => total + fuel(mass), 0);
}

export function part2(input: string): number {
	let total = 0;
	for (const mass of masses(input)) {
		for (let amount = fuel(mass); amount > 0; amount = fuel(amount))
			total += amount;
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
