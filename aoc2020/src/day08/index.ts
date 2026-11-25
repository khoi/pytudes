import { run } from "../../../scripts/aoc.ts";

function parse(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [operation, operand] = line.split(" ");
			return { operation, operand: Number(operand) };
		});
}

function execute(program: ReturnType<typeof parse>, flip = -1) {
	let accumulator = 0;
	let pc = 0;
	const visited = new Set<number>();
	while (pc >= 0 && pc < program.length && !visited.has(pc)) {
		visited.add(pc);
		const { operation, operand } = program[pc];
		if (operation === "acc") accumulator += operand;
		const jump =
			operation === "jmp" ? pc !== flip : operation === "nop" && pc === flip;
		pc += jump ? operand : 1;
	}
	return { accumulator, visited, terminated: pc === program.length };
}

export function part1(input: string) {
	return execute(parse(input)).accumulator;
}

export function part2(input: string) {
	const program = parse(input);
	for (const pc of execute(program).visited) {
		if (program[pc].operation === "acc") continue;
		const repaired = execute(program, pc);
		if (repaired.terminated) return repaired.accumulator;
	}
	throw new Error("No single-instruction repair terminates");
}

if (import.meta.main) run(import.meta.url, part1, part2);
