import { run } from "../../../scripts/aoc.ts";

function execute(input: string, initialA: number): number {
	const program = input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.replace(",", "").split(" "));
	const registers: Record<string, number> = { a: initialA, b: 0 };
	let pc = 0;
	while (pc >= 0 && pc < program.length) {
		const [op, arg, offset] = program[pc];
		let jump = 1;
		switch (op) {
			case "hlf":
				registers[arg] = Math.floor(registers[arg] / 2);
				break;
			case "tpl":
				registers[arg] *= 3;
				break;
			case "inc":
				registers[arg]++;
				break;
			case "jmp":
				jump = Number(arg);
				break;
			case "jie":
				if (registers[arg] % 2 === 0) jump = Number(offset);
				break;
			case "jio":
				if (registers[arg] === 1) jump = Number(offset);
				break;
			default:
				throw new Error("Unknown instruction: " + op);
		}
		pc += jump;
	}
	return registers.b;
}

export function part1(input: string): number {
	return execute(input, 0);
}

export function part2(input: string): number {
	return execute(input, 1);
}

if (import.meta.main) run(import.meta.url, part1, part2);
