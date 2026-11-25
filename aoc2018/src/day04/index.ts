import { run } from "../../../scripts/aoc.ts";

function sleepRecords(input: string) {
	const records = new Map<number, number[]>();
	let id = 0;
	let asleep = 0;
	for (const line of input.trim().split("\n").sort()) {
		const guard = line.match(/#(\d+)/);
		const minute = Number(line.slice(15, 17));
		if (guard) {
			id = Number(guard[1]);
			if (!records.has(id)) records.set(id, Array(60).fill(0));
		} else if (line.includes("falls asleep")) {
			asleep = minute;
		} else {
			for (let i = asleep; i < minute; i++) records.get(id)![i]++;
		}
	}
	return records;
}

function strategy(input: string, score: (minutes: number[]) => number): number {
	const [id, minutes] = [...sleepRecords(input)].sort(
		(a, b) => score(b[1]) - score(a[1]),
	)[0];
	return id * minutes.indexOf(Math.max(...minutes));
}

export function part1(input: string): number {
	return strategy(input, (minutes) => minutes.reduce((a, b) => a + b, 0));
}

export function part2(input: string): number {
	return strategy(input, (minutes) => Math.max(...minutes));
}

if (import.meta.main) run(import.meta.url, part1, part2);
