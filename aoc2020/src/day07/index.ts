import { run } from "../../../scripts/aoc.ts";

function rules(input: string) {
	const rules = new Map<string, { color: string; count: number }[]>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [color, contents] = line.split(" bags contain ");
		const children = Array.from(
			contents.matchAll(/(\d+) ([a-z]+ [a-z]+) bags?/g),
			(match) => ({
				color: match[2],
				count: Number(match[1]),
			}),
		);
		rules.set(color, children);
	}
	return rules;
}

export function part1(input: string) {
	const parents = new Map<string, string[]>();
	for (const [outer, children] of rules(input)) {
		for (const { color } of children) {
			if (!parents.has(color)) parents.set(color, []);
			parents.get(color)!.push(outer);
		}
	}
	const seen = new Set(["shiny gold"]);
	for (const bag of seen) {
		for (const parent of parents.get(bag) ?? []) seen.add(parent);
	}
	return seen.size - 1;
}

export function part2(input: string) {
	const contains = rules(input);
	const totals = new Map<string, number>();
	function inside(bag: string): number {
		const cached = totals.get(bag);
		if (cached !== undefined) return cached;
		const total = (contains.get(bag) ?? []).reduce(
			(sum, { color, count }) => sum + count * (1 + inside(color)),
			0,
		);
		totals.set(bag, total);
		return total;
	}
	return inside("shiny gold");
}

if (import.meta.main) run(import.meta.url, part1, part2);
