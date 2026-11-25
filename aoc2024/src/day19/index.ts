import { run } from "../../../scripts/aoc.ts";

function arrangements(input: string) {
	const [patterns, designs] = input.trim().split(/\r?\n\s*\n/);
	const towels = patterns.split(", ");
	return designs.split(/\r?\n/).map((design) => {
		const ways = new Array<number>(design.length + 1).fill(0);
		ways[0] = 1;
		for (let i = 0; i < design.length; i++) {
			if (ways[i] === 0) continue;
			for (const towel of towels)
				if (design.startsWith(towel, i)) ways[i + towel.length] += ways[i];
		}
		return ways[design.length];
	});
}

export function part1(input: string) {
	return arrangements(input).filter((count) => count > 0).length;
}
export function part2(input: string) {
	return arrangements(input).reduce((sum, count) => sum + count, 0);
}

if (import.meta.main) run(import.meta.url, part1, part2);
