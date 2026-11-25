import { run } from "../../../scripts/aoc.ts";

export function lookAndSay(input: string, rounds: number): string {
	let sequence = input.trim();
	for (let round = 0; round < rounds; round++) {
		let next = "";
		for (let start = 0; start < sequence.length; ) {
			let end = start + 1;
			while (sequence[end] === sequence[start]) end++;
			next += String(end - start) + sequence[start];
			start = end;
		}
		sequence = next;
	}
	return sequence;
}

export function part1(input: string): number {
	return lookAndSay(input, 40).length;
}

export function part2(input: string): number {
	return lookAndSay(input, 50).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
