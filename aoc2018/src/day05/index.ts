import { run } from "../../../scripts/aoc.ts";

function react(polymer: string, removed = 0): number {
	const stack: number[] = [];
	for (let i = 0; i < polymer.length; i++) {
		const unit = polymer.charCodeAt(i);
		if ((unit | 32) === removed) continue;
		if (stack.length > 0 && (stack[stack.length - 1] ^ unit) === 32)
			stack.pop();
		else stack.push(unit);
	}
	return stack.length;
}

export function part1(input: string): number {
	return react(input.trim());
}

export function part2(input: string): number {
	const polymer = input.trim();
	let shortest = polymer.length;
	for (let unit = 97; unit <= 122; unit++)
		shortest = Math.min(shortest, react(polymer, unit));
	return shortest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
