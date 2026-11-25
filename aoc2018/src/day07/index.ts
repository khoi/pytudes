import { run } from "../../../scripts/aoc.ts";

function schedule(input: string, workers: number, base: number) {
	const dependencies = new Map<string, Set<string>>();
	for (const line of input.trim().split("\n")) {
		const [, before, after] = line.match(
			/Step (\w) must be finished before step (\w)/,
		)!;
		if (!dependencies.has(before)) dependencies.set(before, new Set());
		if (!dependencies.has(after)) dependencies.set(after, new Set());
		dependencies.get(after)!.add(before);
	}
	const busy = new Map<string, number>();
	const completed = new Set<string>();
	let time = 0;
	while (completed.size < dependencies.size) {
		const available = [...dependencies.keys()]
			.filter(
				(step) =>
					!busy.has(step) &&
					!completed.has(step) &&
					[...dependencies.get(step)!].every((before) => completed.has(before)),
			)
			.sort();
		for (const step of available.slice(0, workers - busy.size)) {
			busy.set(step, time + base + step.charCodeAt(0) - 64);
		}
		if (!busy.size) throw new Error("Circular dependency");
		time = Math.min(...busy.values());
		for (const [step, until] of busy) {
			if (until !== time) continue;
			completed.add(step);
			busy.delete(step);
		}
	}
	return { order: [...completed].join(""), time };
}

export function part1(input: string): string {
	return schedule(input, 1, 0).order;
}

export function part2(input: string, workers = 5, base = 60): number {
	return schedule(input, workers, base).time;
}

if (import.meta.main) run(import.meta.url, part1, part2);
