import { run } from "../../../scripts/aoc.ts";

type Program = { weight: number; children: string[] };

function tower(input: string) {
	const programs = new Map<string, Program>();
	const supported = new Set<string>();
	for (const line of input.trim().split(/\r?\n/)) {
		const match = /^(\w+) \((\d+)\)(?: -> (.*))?$/.exec(line);
		if (!match) throw new Error(`Invalid program: ${line}`);
		const [, name, weight, above] = match;
		const children = above?.split(", ") ?? [];
		programs.set(name, { weight: Number(weight), children });
		for (const child of children) supported.add(child);
	}
	const root = [...programs.keys()].find((name) => !supported.has(name));
	if (!root) throw new Error("Missing root");
	return { programs, root };
}

export function part1(input: string): string {
	return tower(input).root;
}

export function part2(input: string): number {
	const { programs, root } = tower(input);
	const totals = new Map<string, number>();
	function weigh(name: string): number {
		const { weight, children } = programs.get(name)!;
		const total = children.reduce((sum, child) => sum + weigh(child), weight);
		totals.set(name, total);
		return total;
	}
	weigh(root);

	function correct(name: string, target?: number): number {
		const { weight, children } = programs.get(name)!;
		const groups = new Map<number, string[]>();
		for (const child of children) {
			const total = totals.get(child)!;
			const group = groups.get(total) ?? [];
			group.push(child);
			groups.set(total, group);
		}
		if (groups.size <= 1 && target !== undefined)
			return weight + target - totals.get(name)!;
		if (groups.size !== 2) throw new Error("Tower has no unique correction");
		const expected =
			target === undefined
				? [...groups].find(([, names]) => names.length > 1)?.[0]
				: (target - weight) / children.length;
		const outliers = [...groups].find(([total]) => total !== expected)?.[1];
		if (expected === undefined || outliers?.length !== 1)
			throw new Error("Ambiguous imbalance");
		return correct(outliers[0], expected);
	}
	return correct(root);
}

if (import.meta.main) run(import.meta.url, part1, part2);
