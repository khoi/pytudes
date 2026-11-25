import { run } from "../../../scripts/aoc.ts";

const comparisons: Record<string, (a: number, b: number) => boolean> = {
	"<": (a, b) => a < b,
	"<=": (a, b) => a <= b,
	"==": (a, b) => a === b,
	"!=": (a, b) => a !== b,
	">=": (a, b) => a >= b,
	">": (a, b) => a > b,
};

function execute(input: string) {
	const registers = new Map<string, number>();
	let highest = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const [name, op, amount, , other, compare, threshold] = line.split(" ");
		if (!registers.has(name)) registers.set(name, 0);
		if (!registers.has(other)) registers.set(other, 0);
		if (!comparisons[compare](registers.get(other)!, Number(threshold)))
			continue;
		const value =
			registers.get(name)! + (op === "inc" ? 1 : -1) * Number(amount);
		registers.set(name, value);
		highest = Math.max(highest, value);
	}
	return { final: Math.max(...registers.values()), highest };
}

export function part1(input: string): number {
	return execute(input).final;
}

export function part2(input: string): number {
	return execute(input).highest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
