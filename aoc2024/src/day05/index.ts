import { run } from "../../../scripts/aoc.ts";

function middlePages(input: string, repair: boolean): number {
	const [rules, updates] = input.trim().split(/\r?\n\r?\n/);
	const predecessors = new Map<number, Set<number>>();
	for (const line of rules.split(/\r?\n/)) {
		const [before, after] = line.split("|").map(Number);
		if (!predecessors.has(after)) predecessors.set(after, new Set());
		predecessors.get(after)!.add(before);
	}
	let total = 0;
	for (const line of updates.split(/\r?\n/)) {
		const pages = line.split(",").map(Number);
		const remaining = new Set(pages);
		const ordered: number[] = [];
		while (remaining.size > 0) {
			const next = [...remaining].find((page) => {
				for (const before of predecessors.get(page) ?? []) {
					if (remaining.has(before)) return false;
				}
				return true;
			});
			if (next === undefined) throw new Error("Cyclic page ordering");
			remaining.delete(next);
			ordered.push(next);
		}
		const changed = ordered.some((page, index) => page !== pages[index]);
		if (changed === repair) total += ordered[Math.floor(ordered.length / 2)];
	}
	return total;
}

export function part1(input: string): number {
	return middlePages(input, false);
}

export function part2(input: string): number {
	return middlePages(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
