import { run } from "../../../scripts/aoc.ts";

function arrangements(pattern: string, groups: number[]) {
	const memo = new Map<number, number>();
	const maxRun = Math.max(...groups) + 1;
	function ways(i: number, group: number, runLength: number): number {
		if (i === pattern.length)
			return Number(
				(runLength === 0 && group === groups.length) ||
					(group === groups.length - 1 && runLength === groups[group]),
			);
		const key = (i * (groups.length + 1) + group) * maxRun + runLength;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let count = 0;
		if (pattern[i] !== "." && runLength < groups[group])
			count += ways(i + 1, group, runLength + 1);
		if (pattern[i] !== "#") {
			if (runLength === 0) count += ways(i + 1, group, 0);
			else if (runLength === groups[group]) count += ways(i + 1, group + 1, 0);
		}
		memo.set(key, count);
		return count;
	}
	return ways(0, 0, 0);
}

function count(input: string, copies: number) {
	let total = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const [pattern, groups] = line.split(/\s+/);
		const repeated = Array<string>(copies)
			.fill(groups)
			.join(",")
			.split(",")
			.map(Number);
		total += arrangements(
			Array<string>(copies).fill(pattern).join("?"),
			repeated,
		);
	}
	return total;
}

export const part1 = (input: string) => count(input, 1);
export const part2 = (input: string) => count(input, 5);

if (import.meta.main) run(import.meta.url, part1, part2);
