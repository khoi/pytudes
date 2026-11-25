import { run } from "../../../scripts/aoc.ts";

function cups(input: string, total: number, moves: number): Uint32Array {
	const labels = [...input.trim()].map(Number);
	const next = new Uint32Array(total + 1);
	let previous = labels[0];
	for (const label of labels.slice(1)) {
		next[previous] = label;
		previous = label;
	}
	for (let label = labels.length + 1; label <= total; label++) {
		next[previous] = label;
		previous = label;
	}
	let current = labels[0];
	next[previous] = current;
	for (let move = 0; move < moves; move++) {
		const a = next[current];
		const b = next[a];
		const c = next[b];
		next[current] = next[c];
		let destination = current === 1 ? total : current - 1;
		while (destination === a || destination === b || destination === c) {
			destination = destination === 1 ? total : destination - 1;
		}
		next[c] = next[destination];
		next[destination] = a;
		current = next[current];
	}
	return next;
}

export function part1(input: string): string {
	const next = cups(input, input.trim().length, 100);
	let order = "";
	for (let cup = next[1]; cup !== 1; cup = next[cup]) order += cup;
	return order;
}

export function part2(input: string): number {
	const next = cups(input, 1_000_000, 10_000_000);
	return next[1] * next[next[1]];
}

if (import.meta.main) run(import.meta.url, part1, part2);
