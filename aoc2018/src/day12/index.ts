import { run } from "../../../scripts/aoc.ts";

function sumAfter(input: string, generations: number): number {
	const [initial, rules] = input.trim().split(/\r?\n\s*\n/);
	let plants = new Set<number>();
	for (const [i, pot] of Array.from(initial.split(": ")[1].trim()).entries()) {
		if (pot === "#") plants.add(i);
	}
	const fertile = new Set(
		rules
			.trim()
			.split(/\r?\n/)
			.filter((line) => line.endsWith("#"))
			.map((line) => line.slice(0, 5)),
	);
	const seen = new Map<string, { generation: number; left: number }>();
	for (let generation = 0; generation < generations; ) {
		if (!plants.size) return 0;
		const positions = [...plants].sort((a, b) => a - b);
		const left = positions[0];
		const shape = positions.map((p) => p - left).join(",");
		const previous = seen.get(shape);
		if (previous) {
			const period = generation - previous.generation;
			const repeats = Math.floor((generations - generation) / period);
			if (repeats > 0) {
				const shift = repeats * (left - previous.left);
				plants = new Set(positions.map((p) => p + shift));
				generation += repeats * period;
				continue;
			}
		} else seen.set(shape, { generation, left });
		const next = new Set<number>();
		for (let p = left - 2; p <= positions[positions.length - 1] + 2; p++) {
			let pattern = "";
			for (let d = -2; d <= 2; d++) pattern += plants.has(p + d) ? "#" : ".";
			if (fertile.has(pattern)) next.add(p);
		}
		plants = next;
		generation++;
	}
	return [...plants].reduce((sum, pot) => sum + pot, 0);
}

export function part1(input: string): number {
	return sumAfter(input, 20);
}

export function part2(input: string): number {
	return sumAfter(input, 50_000_000_000);
}

if (import.meta.main) run(import.meta.url, part1, part2);
