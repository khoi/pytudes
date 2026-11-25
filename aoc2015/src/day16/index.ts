import { run } from "../../../scripts/aoc.ts";

const evidence: Record<string, number> = {
	children: 3,
	cats: 7,
	samoyeds: 2,
	pomeranians: 3,
	akitas: 0,
	vizslas: 0,
	goldfish: 5,
	trees: 3,
	cars: 2,
	perfumes: 1,
};

function identify(input: string, ranges: boolean): number {
	for (const line of input.trim().split(/\r?\n/)) {
		const matches = [...line.matchAll(/([a-z]+): (\d+)/g)];
		if (
			matches.every(([, trait, count]) => {
				if (ranges && (trait === "cats" || trait === "trees"))
					return Number(count) > evidence[trait];
				if (ranges && (trait === "pomeranians" || trait === "goldfish"))
					return Number(count) < evidence[trait];
				return Number(count) === evidence[trait];
			})
		)
			return Number(line.match(/^Sue (\d+):/)![1]);
	}
	throw new Error("No matching aunt");
}

export function part1(input: string): number {
	return identify(input, false);
}

export function part2(input: string): number {
	return identify(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
