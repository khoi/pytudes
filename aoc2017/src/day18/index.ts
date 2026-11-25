import { run } from "../../../scripts/aoc.ts";
import {
	parseAssembly,
	value,
	type Instruction,
	type Registers,
} from "../assembly.ts";

class Program {
	pc = 0;
	registers: Registers;
	messages: number[] = [];
	inboxHead = 0;
	sent = 0;

	constructor(id: number) {
		this.registers = new Map([["p", id]]);
	}

	execute([op, x, y]: Instruction): void {
		const right = value(y, this.registers);
		const left = value(x, this.registers);
		switch (op) {
			case "set":
				this.registers.set(x, right);
				break;
			case "add":
				this.registers.set(x, left + right);
				break;
			case "mul":
				this.registers.set(x, left * right);
				break;
			case "mod":
				this.registers.set(x, left % right);
				break;
			case "jgz":
				if (left > 0) {
					this.pc += right;
					return;
				}
				break;
			default:
				throw new Error(`Unknown opcode ${op}`);
		}
		this.pc++;
	}

	runUntilBlocked(code: Instruction[], peer: Program): void {
		while (code[this.pc]) {
			const instruction = code[this.pc];
			const [op, operand] = instruction;
			if (op === "snd") {
				peer.messages.push(value(operand, this.registers));
				this.sent++;
				this.pc++;
			} else if (op === "rcv") {
				if (this.inboxHead === this.messages.length) {
					this.messages.length = 0;
					this.inboxHead = 0;
					return;
				}
				this.registers.set(operand, this.messages[this.inboxHead++]);
				this.pc++;
			} else {
				this.execute(instruction);
			}
		}
	}
}

export function part1(input: string): number {
	const code = parseAssembly(input);
	const program = new Program(0);
	let sound = 0;
	while (code[program.pc]) {
		const instruction = code[program.pc];
		const [op, x] = instruction;
		if (op === "snd") {
			sound = value(x, program.registers);
			program.pc++;
		} else if (op === "rcv") {
			if (value(x, program.registers) !== 0) return sound;
			program.pc++;
		} else {
			program.execute(instruction);
		}
	}
	throw new Error("Program terminated before recovering a sound");
}

export function part2(input: string): number {
	const code = parseAssembly(input);
	const first = new Program(0);
	const second = new Program(1);
	do {
		first.runUntilBlocked(code, second);
		second.runUntilBlocked(code, first);
	} while (code[first.pc] && first.inboxHead < first.messages.length);
	return second.sent;
}

if (import.meta.main) run(import.meta.url, part1, part2);
