import { run } from "../../../scripts/aoc.ts";

function recover(input: string, mostFrequent: boolean): string {
	const lines = input.trim().split(/\r?\n/);
	let message = "";
	for (let column = 0; column < lines[0].length; column++) {
		const counts = new Map<string, number>();
		for (const line of lines) {
			const ch = line[column];
			counts.set(ch, (counts.get(ch) ?? 0) + 1);
		}
		const ranked = [...counts].sort(([, a], [, b]) =>
			mostFrequent ? b - a : a - b,
		);
		message += ranked[0][0];
	}
	return message;
}

export const part1 = (input: string) => recover(input, true);
export const part2 = (input: string) => recover(input, false);

if (import.meta.main) run(import.meta.url, part1, part2);
