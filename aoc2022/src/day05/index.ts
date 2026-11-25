import { run } from "../../../scripts/aoc.ts";

function rearrange(input: string, keepOrder: boolean) {
	const [diagram, instructions] = input.trimEnd().split(/\r?\n\r?\n/);
	const rows = diagram.split(/\r?\n/).reverse();
	const stacks = rows
		.shift()!
		.trim()
		.split(/\s+/)
		.map((_, i) => {
			const column = 4 * i + 1;
			return rows
				.map((row) => row[column])
				.filter((crate) => crate && crate !== " ");
		});
	for (const line of instructions.split(/\r?\n/)) {
		const [count, from, to] = line.match(/\d+/g)!.map(Number);
		const source = stacks[from - 1];
		const moved = source.splice(source.length - count, count);
		stacks[to - 1].push(...(keepOrder ? moved : moved.reverse()));
	}
	return stacks.map((stack) => stack.at(-1)).join("");
}

export function part1(input: string) {
	return rearrange(input, false);
}

export function part2(input: string) {
	return rearrange(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
