import { run } from "../../../scripts/aoc.ts";
import { evaluate, opcodes, type Opcode } from "../device.ts";

function parse(input: string) {
	const lines = input.trim().split(/\r?\n/).filter(Boolean);
	const numbers = (line: string) => line.match(/-?\d+/g)!.map(Number);
	const samples: {
		before: number[];
		instruction: number[];
		after: number[];
	}[] = [];
	let i = 0;
	while (lines[i]?.startsWith("Before:")) {
		samples.push({
			before: numbers(lines[i]),
			instruction: numbers(lines[i + 1]),
			after: numbers(lines[i + 2]),
		});
		i += 3;
	}
	return { samples, program: lines.slice(i).map(numbers) };
}

function candidates({
	before,
	instruction: [, a, b, c],
	after,
}: ReturnType<typeof parse>["samples"][number]) {
	return opcodes.filter(
		(name) =>
			evaluate(name, before, a, b) === after[c] &&
			before.every((value, index) => index === c || value === after[index]),
	);
}

export function part1(input: string) {
	return parse(input).samples.filter((sample) => candidates(sample).length >= 3)
		.length;
}

export function part2(input: string) {
	const { samples, program } = parse(input);
	const options = opcodes.map(() => new Set(opcodes));
	for (const sample of samples) {
		const matches = candidates(sample);
		const possible = options[sample.instruction[0]];
		for (const name of possible)
			if (!matches.includes(name)) possible.delete(name);
	}
	const order = options
		.map((_, id) => id)
		.sort((a, b) => options[a].size - options[b].size);
	const mapping = new Map<number, Opcode>();
	const used = new Set<Opcode>();
	function assign(i: number): boolean {
		if (i === order.length) return true;
		const id = order[i];
		for (const name of options[id]) {
			if (used.has(name)) continue;
			mapping.set(id, name);
			used.add(name);
			if (assign(i + 1)) return true;
			used.delete(name);
			mapping.delete(id);
		}
		return false;
	}
	if (!assign(0)) throw new Error("Inconsistent opcode samples");
	const registers = [0, 0, 0, 0];
	for (const [id, a, b, c] of program)
		registers[c] = evaluate(mapping.get(id)!, registers, a, b);
	return registers[0];
}

if (import.meta.main) run(import.meta.url, part1, part2);
