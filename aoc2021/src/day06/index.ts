import { run } from "../../../scripts/aoc.ts";

function population(input: string, days: number) {
	const counts = Array<number>(9).fill(0);
	for (const timer of input.trim().split(",").map(Number)) counts[timer]++;
	for (let day = 0; day < days; day++) {
		const spawning = counts.shift()!;
		counts[6] += spawning;
		counts.push(spawning);
	}
	return counts.reduce((sum, count) => sum + count, 0);
}

export const part1 = (input: string) => population(input, 80);
export const part2 = (input: string) => population(input, 256);

if (import.meta.main) run(import.meta.url, part1, part2);
