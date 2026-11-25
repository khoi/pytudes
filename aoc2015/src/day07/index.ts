import { run } from "../../../scripts/aoc.ts";

function signal(input: string, overrideB?: number): number {
	const gates = new Map<string, string[]>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [expression, wire] = line.split(" -> ");
		gates.set(wire, expression.split(" "));
	}
	const values = new Map<string, number>();
	if (overrideB !== undefined) values.set("b", overrideB);

	function read(wire: string): number {
		if (/^\d+$/.test(wire)) return Number(wire);
		const saved = values.get(wire);
		if (saved !== undefined) return saved;
		const gate = gates.get(wire);
		if (!gate) throw new Error("Unknown wire " + wire);
		let signal: number;
		if (gate.length === 1) signal = read(gate[0]);
		else if (gate[0] === "NOT") signal = ~read(gate[1]);
		else {
			const left = read(gate[0]);
			const right = read(gate[2]);
			switch (gate[1]) {
				case "AND":
					signal = left & right;
					break;
				case "OR":
					signal = left | right;
					break;
				case "LSHIFT":
					signal = right >= 16 ? 0 : left << right;
					break;
				case "RSHIFT":
					signal = right >= 16 ? 0 : left >>> right;
					break;
				default:
					throw new Error("Unknown gate " + gate[1]);
			}
		}
		signal &= 0xffff;
		values.set(wire, signal);
		return signal;
	}
	return read("a");
}

export function part1(input: string): number {
	return signal(input);
}

export function part2(input: string): number {
	return signal(input, part1(input));
}

if (import.meta.main) run(import.meta.url, part1, part2);
