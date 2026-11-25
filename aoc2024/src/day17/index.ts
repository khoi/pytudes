import { run } from "../../../scripts/aoc.ts";

function parse(input: string) {
	const [registers, instructions] = input.trim().split(/\r?\n\s*\n/);
	const [a, b, c] = registers.match(/\d+/g)!.map(BigInt);
	return { a, b, c, program: instructions.match(/\d+/g)!.map(Number) };
}

function execute(program: number[], a: bigint, b: bigint, c: bigint) {
	const output: number[] = [];
	for (let ip = 0; ip < program.length; ip += 2) {
		const opcode = program[ip];
		const arg = program[ip + 1];
		const combo = () => {
			if (arg < 4) return BigInt(arg);
			if (arg === 4) return a;
			if (arg === 5) return b;
			if (arg === 6) return c;
			throw new Error("Invalid combo operand");
		};
		switch (opcode) {
			case 0:
				a >>= combo();
				break;
			case 1:
				b ^= BigInt(arg);
				break;
			case 2:
				b = combo() % 8n;
				break;
			case 3:
				if (a !== 0n) ip = arg - 2;
				break;
			case 4:
				b ^= c;
				break;
			case 5:
				output.push(Number(combo() % 8n));
				break;
			case 6:
				b = a >> combo();
				break;
			case 7:
				c = a >> combo();
				break;
			default:
				throw new Error("Invalid opcode");
		}
	}
	return output;
}

export function part1(input: string) {
	const { program, a, b, c } = parse(input);
	return execute(program, a, b, c).join(",");
}

export function part2(input: string) {
	const { program, b, c } = parse(input);
	let candidates = [0n];
	for (let start = program.length - 1; start >= 0; start--) {
		const suffix = program.slice(start).join(",");
		const next: bigint[] = [];
		for (const prefix of candidates) {
			for (let digit = 0n; digit < 8n; digit++) {
				const candidate = prefix * 8n + digit;
				if (execute(program, candidate, b, c).join(",") === suffix)
					next.push(candidate);
			}
		}
		candidates = next;
	}
	if (!candidates.length) throw new Error("No quine found");
	return candidates[0];
}

if (import.meta.main) run(import.meta.url, part1, part2);
