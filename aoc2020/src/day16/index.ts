import { run } from "../../../scripts/aoc.ts";

interface Rule {
	name: string;
	ranges: number[][];
}

function parse(input: string) {
	const [rules, mine, nearby] = input.trim().split(/\r?\n\r?\n/);
	const tickets = (block: string) =>
		block
			.split(/\r?\n/)
			.slice(1)
			.map((line) => line.split(",").map(Number));
	return {
		rules: rules.split(/\r?\n/).map((line): Rule => {
			const [name, ranges] = line.split(": ");
			return {
				name,
				ranges: ranges
					.split(" or ")
					.map((range) => range.split("-").map(Number)),
			};
		}),
		mine: tickets(mine)[0],
		nearby: tickets(nearby),
	};
}

function accepts(rule: Rule, value: number) {
	return rule.ranges.some(([min, max]) => min <= value && value <= max);
}

export function part1(input: string): number {
	const { rules, nearby } = parse(input);
	return nearby
		.flat()
		.filter((value) => !rules.some((rule) => accepts(rule, value)))
		.reduce((sum, value) => sum + value, 0);
}

export function part2(input: string): number {
	const { rules, mine, nearby } = parse(input);
	const valid = [
		mine,
		...nearby.filter((ticket) =>
			ticket.every((v) => rules.some((r) => accepts(r, v))),
		),
	];
	const fields = rules
		.map((rule) => ({
			rule,
			columns: mine
				.map((_, i) => i)
				.filter((i) => valid.every((ticket) => accepts(rule, ticket[i]))),
		}))
		.sort((a, b) => a.columns.length - b.columns.length);
	const used = new Set<number>();
	function assign(index: number): number | undefined {
		if (index === fields.length) return 1;
		const { rule, columns } = fields[index];
		for (const column of columns) {
			if (used.has(column)) continue;
			used.add(column);
			const rest = assign(index + 1);
			if (rest !== undefined)
				return rest * (rule.name.startsWith("departure") ? mine[column] : 1);
			used.delete(column);
		}
	}
	const product = assign(0);
	if (product === undefined) throw new Error("Inconsistent ticket fields");
	return product;
}

if (import.meta.main) run(import.meta.url, part1, part2);
