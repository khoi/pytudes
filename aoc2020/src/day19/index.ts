import { run } from "../../../scripts/aoc.ts";

type Rule = string | number[][];

function count(input: string, recursive: boolean): number {
	const [definitions, messages] = input.trim().split(/\r?\n\r?\n/);
	const rules = new Map<number, Rule>();
	for (const definition of definitions.split(/\r?\n/)) {
		const [id, pattern] = definition.split(": ");
		rules.set(
			Number(id),
			pattern.startsWith('"')
				? pattern.slice(1, -1)
				: pattern.split(" | ").map((choice) => choice.split(" ").map(Number)),
		);
	}
	if (recursive) {
		rules.set(8, [[42], [42, 8]]);
		rules.set(11, [
			[42, 31],
			[42, 11, 31],
		]);
	}
	return messages.split(/\r?\n/).filter((message) => {
		const matches = new Map<number, Set<number>>();
		function ends(ruleId: number, begin: number): Set<number> {
			const key = ruleId * (message.length + 1) + begin;
			const cached = matches.get(key);
			if (cached) return cached;
			const rule = rules.get(ruleId)!;
			const positions = new Set<number>();
			if (typeof rule === "string") {
				if (message.startsWith(rule, begin)) positions.add(begin + rule.length);
			} else if (begin < message.length) {
				for (const sequence of rule) {
					let reached = new Set([begin]);
					for (const next of sequence) {
						const following = new Set<number>();
						for (const at of reached) {
							for (const end of ends(next, at)) following.add(end);
						}
						reached = following;
						if (!reached.size) break;
					}
					for (const end of reached) positions.add(end);
				}
			}
			matches.set(key, positions);
			return positions;
		}
		return ends(0, 0).has(message.length);
	}).length;
}

export function part1(input: string): number {
	return count(input, false);
}

export function part2(input: string): number {
	return count(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
