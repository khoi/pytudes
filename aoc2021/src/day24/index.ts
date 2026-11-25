import { run } from "../../../scripts/aoc.ts";

const registers = ["w", "x", "y", "z"];

function execute(block: string[], previous: number[], digit: number) {
	const state = [...previous];
	for (const line of block) {
		const [op, dest, arg] = line.split(" ");
		const target = registers.indexOf(dest);
		const source = registers.indexOf(arg);
		const operand = source < 0 ? Number(arg) : state[source];
		switch (op) {
			case "inp":
				state[target] = digit;
				break;
			case "add":
				state[target] += operand;
				break;
			case "mul":
				state[target] *= operand;
				break;
			case "div":
				state[target] = Math.trunc(state[target] / operand);
				break;
			case "mod":
				state[target] %= operand;
				break;
			case "eql":
				state[target] = Number(state[target] === operand);
				break;
			default:
				throw new Error("Unknown ALU instruction");
		}
	}
	return state;
}

const monad = [
	"inp w",
	"mul x 0",
	"add x z",
	"mod x 26",
	/^div z (1|26)$/,
	/^add x -?\d+$/,
	"eql x w",
	"eql x 0",
	"mul y 0",
	"add y 25",
	"mul y x",
	"add y 1",
	"mul z y",
	"mul y 0",
	"add y w",
	/^add y -?\d+$/,
	"mul y x",
	"add z y",
];

function stackDigits(blocks: string[][], largest: boolean) {
	const stack: [number, number][] = [];
	const digits = Array<number>(blocks.length);
	for (const [i, block] of blocks.entries()) {
		if (block.length !== monad.length) return;
		const matches = monad.every((expected, j) =>
			typeof expected === "string"
				? expected === block[j]
				: expected.test(block[j]),
		);
		if (!matches) return;
		const [divisor, compare, add] = [4, 5, 15].map((j) =>
			Number(block[j].split(" ")[2]),
		);
		if (add < 0 || add > 16) return;
		if (divisor === 1 && compare >= 10) {
			stack.push([i, add]);
		} else if (divisor === 26 && stack.length) {
			const [earlier, pushed] = stack.pop()!;
			const delta = pushed + compare;
			const low = Math.max(1, 1 - delta);
			const high = Math.min(9, 9 - delta);
			if (low > high) return;
			digits[earlier] = largest ? high : low;
			digits[i] = digits[earlier] + delta;
		} else return;
	}
	if (!stack.length) return digits;
}

function model(input: string, largest: boolean) {
	const blocks = input
		.trim()
		.replaceAll("\r\n", "\n")
		.split(/\n(?=inp )/)
		.map((block) => block.split("\n"));
	const digits = stackDigits(blocks, largest);
	const zero = [0, 0, 0, 0];
	if (digits) {
		const final = blocks.reduce(
			(state, block, i) => execute(block, state, digits[i]),
			zero,
		);
		if (final[3] === 0) return Number(digits.join(""));
	}
	const order = Array.from({ length: 9 }, (_, i) => (largest ? 9 - i : i + 1));
	const impossible = new Set<string>();
	function search(index: number, state: number[]): string | undefined {
		if (index === blocks.length) return state[3] === 0 ? "" : undefined;
		const key = [index, ...state].join(",");
		if (impossible.has(key)) return;
		for (const digit of order) {
			const suffix = search(index + 1, execute(blocks[index], state, digit));
			if (suffix !== undefined) return digit + suffix;
		}
		impossible.add(key);
	}
	const result = search(0, zero);
	if (!result) throw new Error("No valid model number");
	return Number(result);
}

export function part1(input: string) {
	return model(input, true);
}
export function part2(input: string) {
	return model(input, false);
}

if (import.meta.main) run(import.meta.url, part1, part2);
