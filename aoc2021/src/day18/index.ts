import { run } from "../../../scripts/aoc.ts";

type Leaf = { value: number; depth: number };

function parse(line: string) {
	let depth = 0;
	const leaves: Leaf[] = [];
	for (const token of line.match(/\[|\]|\d+/g)!) {
		if (token === "[") depth++;
		else if (token === "]") depth--;
		else leaves.push({ value: Number(token), depth });
	}
	return leaves;
}

function add(left: Leaf[], right: Leaf[]) {
	const sum = [...left, ...right].map(({ value, depth }) => ({
		value,
		depth: depth + 1,
	}));
	while (true) {
		const pair = sum.findIndex(
			(leaf, i) => leaf.depth > 4 && sum[i + 1]?.depth === leaf.depth,
		);
		if (pair >= 0) {
			const [a, b] = sum.slice(pair, pair + 2);
			if (pair) sum[pair - 1].value += a.value;
			if (pair + 2 < sum.length) sum[pair + 2].value += b.value;
			sum.splice(pair, 2, { value: 0, depth: a.depth - 1 });
			continue;
		}
		const split = sum.findIndex(({ value }) => value >= 10);
		if (split < 0) return sum;
		const { depth, value } = sum[split];
		sum.splice(
			split,
			1,
			{ depth: depth + 1, value: Math.floor(value / 2) },
			{ depth: depth + 1, value: Math.ceil(value / 2) },
		);
	}
}

function magnitude(leaves: Leaf[]) {
	const stack: Leaf[] = [];
	for (let leaf of leaves) {
		while (stack.length && stack[stack.length - 1].depth === leaf.depth) {
			const left = stack.pop()!;
			leaf = { value: 3 * left.value + 2 * leaf.value, depth: leaf.depth - 1 };
		}
		stack.push(leaf);
	}
	return stack[0].value;
}

export function part1(input: string) {
	return magnitude(input.trim().split(/\r?\n/).map(parse).reduce(add));
}

export function part2(input: string) {
	const numbers = input.trim().split(/\r?\n/).map(parse);
	let best = -Infinity;
	for (const a of numbers)
		for (const b of numbers) {
			if (a !== b) best = Math.max(best, magnitude(add(a, b)));
		}
	return best;
}

if (import.meta.main) run(import.meta.url, part1, part2);
