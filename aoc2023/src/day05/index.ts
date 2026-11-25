import { run } from "../../../scripts/aoc.ts";

type Range = { start: number; end: number };
type Rule = Range & { offset: number };

function convert(range: Range, rules: Rule[]): Range[] {
	const result: Range[] = [];
	let cursor = range.start;
	for (const rule of rules) {
		if (rule.start >= range.end) break;
		if (rule.end <= cursor) continue;
		if (cursor < rule.start) result.push({ start: cursor, end: rule.start });
		const end = Math.min(range.end, rule.end);
		result.push({
			start: Math.max(cursor, rule.start) + rule.offset,
			end: end + rule.offset,
		});
		cursor = end;
		if (cursor === range.end) break;
	}
	if (cursor < range.end) result.push({ start: cursor, end: range.end });
	return result;
}

function nearest(input: string, pairs: boolean) {
	const [header, ...maps] = input.trim().split(/\r?\n\r?\n/);
	const seeds = header
		.slice(header.indexOf(":") + 1)
		.trim()
		.split(/\s+/)
		.map(Number);
	let ranges: Range[] = [];
	for (let i = 0; i < seeds.length; i += pairs ? 2 : 1) {
		const length = pairs ? seeds[i + 1] : 1;
		if (length > 0) ranges.push({ start: seeds[i], end: seeds[i] + length });
	}
	for (const map of maps) {
		const rules = map
			.split(/\r?\n/)
			.slice(1)
			.map((line) => {
				const [dest, start, length] = line.trim().split(/\s+/).map(Number);
				return { start, end: start + length, offset: dest - start };
			})
			.sort((a, b) => a.start - b.start);
		ranges = ranges.flatMap((range) => convert(range, rules));
	}
	return ranges.reduce((best, range) => Math.min(best, range.start), Infinity);
}

export const part1 = (input: string) => nearest(input, false);
export const part2 = (input: string) => nearest(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
