import { run } from "../../../scripts/aoc.ts";

function addresses(input: string): string[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(/[\[\]]/));
}

function abba(text: string): boolean {
	for (let i = 3; i < text.length; i++) {
		if (
			text[i - 3] === text[i] &&
			text[i - 2] === text[i - 1] &&
			text[i] !== text[i - 1]
		)
			return true;
	}
	return false;
}

export function part1(input: string): number {
	return addresses(input).filter(
		(parts) =>
			parts.some((part, i) => i % 2 === 0 && abba(part)) &&
			!parts.some((part, i) => i % 2 === 1 && abba(part)),
	).length;
}

export function part2(input: string): number {
	return addresses(input).filter((parts) => {
		const outside = new Set<string>();
		const inside = new Set<string>();
		for (const [index, part] of parts.entries()) {
			for (let i = 2; i < part.length; i++) {
				const a = part[i - 2],
					b = part[i - 1];
				if (a !== b && a === part[i]) {
					if (index % 2 === 0) outside.add(a + b);
					else inside.add(b + a);
				}
			}
		}
		return [...outside].some((pair) => inside.has(pair));
	}).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
