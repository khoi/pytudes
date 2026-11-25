import { run } from "../../../scripts/aoc.ts";

function analyze(input: string) {
	const candidates = new Map<string, Set<string>>();
	const occurrences: string[] = [];
	for (const line of input.trim().split(/\r?\n/)) {
		const [, ingredientsText, allergensText] = /^(.*) \(contains (.*)\)$/.exec(
			line,
		)!;
		const ingredients = ingredientsText.split(" ");
		occurrences.push(...ingredients);
		for (const allergen of allergensText.split(", ")) {
			const earlier = candidates.get(allergen);
			candidates.set(
				allergen,
				new Set(ingredients.filter((item) => !earlier || earlier.has(item))),
			);
		}
	}
	return { candidates, occurrences };
}

export function part1(input: string): number {
	const { candidates, occurrences } = analyze(input);
	const possible = new Set(
		[...candidates.values()].flatMap((items) => [...items]),
	);
	return occurrences.filter((ingredient) => !possible.has(ingredient)).length;
}

export function part2(input: string): string {
	const { candidates } = analyze(input);
	const known = new Map<string, string>();
	while (candidates.size) {
		const single = [...candidates].find(([, items]) => items.size === 1);
		if (!single) throw new Error("No unique allergen assignment");
		const [allergen, items] = single;
		const [ingredient] = items;
		known.set(allergen, ingredient);
		candidates.delete(allergen);
		for (const remaining of candidates.values()) remaining.delete(ingredient);
	}
	return [...known.keys()]
		.sort()
		.map((allergen) => known.get(allergen))
		.join(",");
}

if (import.meta.main) run(import.meta.url, part1, part2);
