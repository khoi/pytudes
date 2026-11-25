import { run } from "../../../scripts/aoc.ts";

type Rule = {
	target: string;
	condition?: { field: number; less: boolean; limit: number };
};
type Box = [number, number][];
const fields = "xmas";

function parse(input: string) {
	const [definitions, ratings = ""] = input.trim().split(/\r?\n\r?\n/);
	const workflows = new Map<string, Rule[]>();
	for (const line of definitions.split(/\r?\n/)) {
		const [, name, text] = /^(\w+)\{(.+)\}$/.exec(line)!;
		const rules = text.split(",").map((rule): Rule => {
			const match = /^([xmas])([<>])(\d+):(\w+)$/.exec(rule);
			return match
				? {
						target: match[4],
						condition: {
							field: fields.indexOf(match[1]),
							less: match[2] === "<",
							limit: Number(match[3]),
						},
					}
				: { target: rule };
		});
		workflows.set(name, rules);
	}
	const parts = ratings
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => {
			const values: number[] = [];
			for (const [, field, value] of line.matchAll(/([xmas])=(\d+)/g))
				values[fields.indexOf(field)] = Number(value);
			return values;
		});
	return { workflows, parts };
}

export function part1(input: string): number {
	const { workflows, parts } = parse(input);
	let total = 0;
	for (const part of parts) {
		let name = "in";
		while (name !== "A" && name !== "R") {
			name = workflows
				.get(name)!
				.find(
					({ condition: c }) =>
						!c || (c.less ? part[c.field] < c.limit : part[c.field] > c.limit),
				)!.target;
		}
		if (name === "A") total += part.reduce((sum, n) => sum + n, 0);
	}
	return total;
}

export function part2(input: string): number {
	const { workflows } = parse(input);
	function accepted(name: string, box: Box): number {
		if (name === "R") return 0;
		if (name === "A")
			return box.reduce((size, [lo, hi]) => size * (hi - lo + 1), 1);
		let total = 0;
		for (const { target, condition: c } of workflows.get(name)!) {
			if (!c) return total + accepted(target, box);
			const [lo, hi] = box[c.field];
			const pass: [number, number] = c.less
				? [lo, Math.min(hi, c.limit - 1)]
				: [Math.max(lo, c.limit + 1), hi];
			const fail: [number, number] = c.less
				? [Math.max(lo, c.limit), hi]
				: [lo, Math.min(hi, c.limit)];
			if (pass[0] <= pass[1]) {
				const matched = box.slice();
				matched[c.field] = pass;
				total += accepted(target, matched);
			}
			if (fail[0] > fail[1]) break;
			box[c.field] = fail;
		}
		return total;
	}
	return accepted(
		"in",
		Array.from({ length: 4 }, () => [1, 4000]),
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
