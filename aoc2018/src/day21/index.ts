import { run } from "../../../scripts/aoc.ts";
import {
	matchesSequence,
	execute,
	parseProgram,
	type Instruction,
} from "../device.ts";

function divisionLoop(code: Instruction[], start: number, ip: number) {
	const loop = code.slice(start, start + 10);
	if (loop.length !== 10 || loop[0][0] !== "seti" || loop[0][1] !== 0) return;
	const quotient = loop[0][3],
		scratch = loop[1][3],
		dividend = loop[3][2],
		base = loop[2][2];
	if (new Set([ip, quotient, scratch, dividend]).size !== 4 || base <= 0)
		return;
	if (
		!matchesSequence(loop, [
			["seti", 0, null, quotient],
			["addi", quotient, 1, scratch],
			["muli", scratch, base, scratch],
			["gtrr", scratch, dividend, scratch],
			["addr", scratch, ip, ip],
			["addi", ip, 1, ip],
			["seti", start + 8, null, ip],
			["addi", quotient, 1, quotient],
			["seti", start, null, ip],
			["setr", quotient, null, dividend],
		])
	)
		return;
	return { dividend, quotient, scratch, base };
}

function haltingValue(input: string, last: boolean) {
	const { ip, code } = parseProgram(input);
	const gate = code.findIndex(
		([name, a, b]) => name === "eqrr" && (a === 0 || b === 0),
	);
	if (gate === -1) throw new Error("Program has no halt comparison");
	const [, a, b, destination] = code[gate];
	const watched = a === 0 ? b : a;
	const loops = code.map((_, i) => divisionLoop(code, i, ip));
	const registers = [0, 0, 0, 0, 0, 0];
	const seenStates = new Set<string>();
	const seenValues = new Set<number>();
	let newest: number | undefined;
	let pc = 0;
	while (pc >= 0 && pc < code.length) {
		registers[ip] = pc;
		const loop = loops[pc];
		if (pc === gate) {
			const value = registers[watched];
			if (!last) return value;
			registers[destination] = 0;
			const state = registers.join(",");
			if (seenStates.has(state)) break;
			seenStates.add(state);
			if (!seenValues.has(value)) {
				seenValues.add(value);
				newest = value;
			}
		} else if (loop && registers[loop.dividend] >= 0) {
			const quotient = Math.floor(registers[loop.dividend] / loop.base);
			registers[loop.quotient] = registers[loop.dividend] = quotient;
			registers[loop.scratch] = 1;
			registers[ip] = pc + 9;
		} else {
			execute(registers, code[pc]);
		}
		pc = registers[ip] + 1;
	}
	if (newest === undefined)
		throw new Error("Halt comparison was never reached");
	return newest;
}

export const part1 = (input: string) => haltingValue(input, false);
export const part2 = (input: string) => haltingValue(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
