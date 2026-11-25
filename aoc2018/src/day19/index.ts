import { run } from "../../../scripts/aoc.ts";
import {
	matchesSequence,
	execute,
	parseProgram,
	type Instruction,
} from "../device.ts";

function divisorLoop(code: Instruction[], start: number, ip: number) {
	const loop = code.slice(start, start + 15);
	if (loop.length !== 15) return;
	const outer = loop[0][3],
		inner = loop[1][3],
		scratch = loop[2][3];
	const target = loop[3][1] === scratch ? loop[3][2] : loop[3][1];
	const sum = loop[6][3];
	if (new Set([outer, inner, scratch, target, sum, ip]).size !== 6) return;
	const addend = loop[6][1] === sum ? loop[6][2] : loop[6][1];
	if (addend !== outer && addend !== inner) return;
	if (
		!matchesSequence(loop, [
			["seti", 1, null, outer],
			["seti", 1, null, inner],
			["mulr", outer, inner, scratch],
			["eqrr", scratch, target, scratch],
			["addr", scratch, ip, ip],
			["addi", ip, 1, ip],
			["addr", addend, sum, sum],
			["addi", inner, 1, inner],
			["gtrr", inner, target, scratch],
			["addr", scratch, ip, ip],
			["seti", start + 1, null, ip],
			["addi", outer, 1, outer],
			["gtrr", outer, target, scratch],
			["addr", scratch, ip, ip],
			["seti", start, null, ip],
		])
	)
		return;
	return { outer, inner, scratch, target, sum };
}

function solve(input: string, initial: number) {
	const { ip, code } = parseProgram(input);
	const registers = [initial, 0, 0, 0, 0, 0];
	const loops = code.map((_, start) => divisorLoop(code, start, ip));
	let pc = 0;
	while (pc >= 0 && pc < code.length) {
		registers[ip] = pc;
		const loop = loops[pc];
		if (loop && registers[loop.target] >= 1) {
			const n = registers[loop.target];
			for (let divisor = 1; divisor * divisor <= n; divisor++) {
				if (n % divisor !== 0) continue;
				registers[loop.sum] += divisor;
				if (divisor * divisor !== n) registers[loop.sum] += n / divisor;
			}
			registers[loop.inner] = registers[loop.outer] = n + 1;
			registers[loop.scratch] = 1;
			registers[ip] = pc + 14;
		} else {
			execute(registers, code[pc]);
		}
		pc = registers[ip] + 1;
	}
	return registers[0];
}

export const part1 = (input: string) => solve(input, 0);
export const part2 = (input: string) => solve(input, 1);

if (import.meta.main) run(import.meta.url, part1, part2);
