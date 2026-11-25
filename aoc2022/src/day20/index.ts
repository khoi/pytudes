import { run } from "../../../scripts/aoc.ts";

function mix(input: string, key: number, rounds: number): number {
	const original = input
		.trim()
		.split(/\r?\n/)
		.map((line) => ({ value: Number(line) * key }));
	const mixed = original.slice();
	for (let round = 0; round < rounds; round++) {
		for (const entry of original) {
			if (entry.value === 0) continue;
			const index = mixed.indexOf(entry);
			mixed.splice(index, 1);
			const offset = (index + entry.value) % mixed.length;
			mixed.splice((offset + mixed.length) % mixed.length, 0, entry);
		}
	}
	const zero = mixed.findIndex((entry) => entry.value === 0);
	return [1000, 2000, 3000].reduce(
		(sum, n) => sum + mixed[(zero + n) % mixed.length].value,
		0,
	);
}

export const part1 = (input: string) => mix(input, 1, 1);
export const part2 = (input: string) => mix(input, 811589153, 10);

if (import.meta.main) run(import.meta.url, part1, part2);
