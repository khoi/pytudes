import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	let doubles = 0;
	let triples = 0;
	for (const id of input.trim().split(/\s+/)) {
		const counts = new Map<string, number>();
		for (const letter of id) counts.set(letter, (counts.get(letter) ?? 0) + 1);
		const frequencies = new Set(counts.values());
		if (frequencies.has(2)) doubles++;
		if (frequencies.has(3)) triples++;
	}
	return doubles * triples;
}

export function part2(input: string): string {
	const columns: Map<string, string>[] = [];
	for (const id of input.trim().split(/\s+/)) {
		for (let i = 0; i < id.length; i++) {
			const common = id.slice(0, i) + id.slice(i + 1);
			const removed = (columns[i] ??= new Map());
			const previous = removed.get(common);
			if (previous !== undefined && previous !== id[i]) return common;
			removed.set(common, id[i]);
		}
	}
	throw new Error("No pair differs by one letter");
}

if (import.meta.main) run(import.meta.url, part1, part2);
