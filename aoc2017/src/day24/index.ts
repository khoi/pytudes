import { run } from "../../../scripts/aoc.ts";

type Component = { other: number; strength: number; id: number };

function bridges(input: string) {
	const byPort = new Map<number, Component[]>();
	const components = input.trim().split(/\r?\n/);
	function add(port: number, other: number, id: number) {
		const entry = { other, strength: port + other, id };
		const choices = byPort.get(port);
		if (choices) choices.push(entry);
		else byPort.set(port, [entry]);
	}
	components.forEach((line, id) => {
		const [a, b] = line.split("/").map(Number);
		add(a, b, id);
		if (a !== b) add(b, a, id);
	});
	const used = new Uint8Array(components.length);
	let strongest = 0;
	let longest = 0;
	let strengthAtLongest = 0;
	function extend(port: number, length: number, strength: number) {
		strongest = Math.max(strongest, strength);
		if (
			length > longest ||
			(length === longest && strength > strengthAtLongest)
		) {
			longest = length;
			strengthAtLongest = strength;
		}
		for (const next of byPort.get(port) ?? []) {
			if (used[next.id]) continue;
			used[next.id] = 1;
			extend(next.other, length + 1, strength + next.strength);
			used[next.id] = 0;
		}
	}
	extend(0, 0, 0);
	return { strongest, strengthAtLongest };
}

export function part1(input: string): number {
	return bridges(input).strongest;
}

export function part2(input: string): number {
	return bridges(input).strengthAtLongest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
