import { run } from "../../../scripts/aoc.ts";
import { parseAssembly, value } from "../assembly.ts";

const factorSearch = [
	"set f 1",
	"set d 2",
	"set e 2",
	"set g d",
	"mul g e",
	"sub g b",
	"jnz g 2",
	"set f 0",
	"sub e -1",
	"set g e",
	"sub g b",
	"jnz g -8",
	"sub d -1",
	"set g d",
	"sub g b",
	"jnz g -13",
];

function isPrime(n: number): boolean {
	for (let d = 2; d * d <= n; d++) {
		if (n % d === 0) return false;
	}
	return n >= 2;
}

function execute(input: string, initialA: number) {
	const code = parseAssembly(input);
	const instructions = code.map((instruction) => instruction.join(" "));
	const factorLoop = instructions.findIndex((_, i) =>
		factorSearch.every((line, j) => line === instructions[i + j]),
	);
	const registers = new Map([["a", initialA]]);
	let multiplications = 0;
	let pc = 0;
	while (code[pc]) {
		if (pc === factorLoop) {
			const n = registers.get("b") ?? 0;
			if (n > 2 && Number.isInteger(n)) {
				registers.set("f", Number(isPrime(n)));
				registers.set("d", n);
				registers.set("e", n);
				registers.set("g", 0);
				multiplications += (n - 2) ** 2;
				pc += factorSearch.length;
				continue;
			}
		}
		const [op, x, y] = code[pc];
		const right = value(y, registers);
		const left = value(x, registers);
		switch (op) {
			case "set":
				registers.set(x, right);
				break;
			case "sub":
				registers.set(x, left - right);
				break;
			case "mul":
				registers.set(x, left * right);
				multiplications++;
				break;
			case "jnz":
				if (left !== 0) {
					pc += right;
					continue;
				}
				break;
			default:
				throw new Error(`Unknown opcode ${op}`);
		}
		pc++;
	}
	return { registers, multiplications };
}

export function part1(input: string): number {
	return execute(input, 0).multiplications;
}

export function part2(input: string): number {
	return execute(input, 1).registers.get("h") ?? 0;
}

if (import.meta.main) run(import.meta.url, part1, part2);
