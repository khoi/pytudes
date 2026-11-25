import { run } from "../../../scripts/aoc.ts";

function grow(input: string, steps: number) {
	const [template, instructions] = input.trim().split(/\r?\n\s*\r?\n/);
	const rules = new Map(
		instructions
			.split(/\r?\n/)
			.map((line) => line.split(" -> ") as [string, string]),
	);
	const add = (counts: Map<string, number>, key: string, n: number) => {
		counts.set(key, (counts.get(key) ?? 0) + n);
	};
	const counts = new Map<string, number>();
	let pairs = new Map<string, number>();
	for (const element of template) add(counts, element, 1);
	for (let i = 1; i < template.length; i++)
		add(pairs, template.slice(i - 1, i + 1), 1);
	for (let step = 0; step < steps; step++) {
		const next = new Map<string, number>();
		for (const [pair, count] of pairs) {
			const insert = rules.get(pair);
			if (insert === undefined) add(next, pair, count);
			else {
				add(counts, insert, count);
				add(next, pair[0] + insert, count);
				add(next, insert + pair[1], count);
			}
		}
		pairs = next;
	}
	return Math.max(...counts.values()) - Math.min(...counts.values());
}

export const part1 = (input: string) => grow(input, 10);
export const part2 = (input: string) => grow(input, 40);

if (import.meta.main) run(import.meta.url, part1, part2);
