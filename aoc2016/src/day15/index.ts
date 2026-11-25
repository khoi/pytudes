import { run } from "../../../scripts/aoc.ts";
import { combine } from "../../../scripts/congruence.ts";

type Disc = { number: number; positions: number; start: number };

function discs(input: string): Disc[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [number, positions, time, position] = line
				.match(/\d+/g)!
				.map(Number);
			return { number, positions, start: position - time };
		});
}

function releaseTime(discs: Disc[]) {
	let release = { at: 0n, period: 1n };
	for (const { number, positions, start } of discs) {
		const next = combine(release, {
			at: BigInt(-number - start),
			period: BigInt(positions),
		});
		if (!next) throw new Error("Discs cannot align");
		release = next;
	}
	return Number(release.at);
}

export function part1(input: string) {
	return releaseTime(discs(input));
}

export function part2(input: string) {
	const original = discs(input);
	return releaseTime([
		...original,
		{
			number: Math.max(...original.map((disc) => disc.number)) + 1,
			positions: 11,
			start: 0,
		},
	]);
}

if (import.meta.main) run(import.meta.url, part1, part2);
