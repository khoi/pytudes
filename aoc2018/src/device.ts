type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
const multiply: Operation = (a, b) => a * b;
const and: Operation = (a, b) => a & b;
const or: Operation = (a, b) => a | b;
const set: Operation = (a) => a;
const greater: Operation = (a, b) => Number(a > b);
const equal: Operation = (a, b) => Number(a === b);

const definitions = {
	addr: ["r", "r", add],
	addi: ["r", "i", add],
	mulr: ["r", "r", multiply],
	muli: ["r", "i", multiply],
	banr: ["r", "r", and],
	bani: ["r", "i", and],
	borr: ["r", "r", or],
	bori: ["r", "i", or],
	setr: ["r", "i", set],
	seti: ["i", "i", set],
	gtir: ["i", "r", greater],
	gtri: ["r", "i", greater],
	gtrr: ["r", "r", greater],
	eqir: ["i", "r", equal],
	eqri: ["r", "i", equal],
	eqrr: ["r", "r", equal],
} as const;
export type Opcode = keyof typeof definitions;
export const opcodes = Object.keys(definitions) as Opcode[];
export type Instruction = [Opcode, number, number, number];

export function evaluate(
	name: Opcode,
	registers: number[],
	a: number,
	b: number,
) {
	const [leftMode, rightMode, operation] = definitions[name];
	const left = leftMode === "r" ? registers[a] : a;
	const right = rightMode === "r" ? registers[b] : b;
	if (left === undefined || right === undefined) return NaN;
	return operation(left, right);
}

export function parseProgram(input: string) {
	const [binding, ...lines] = input.trim().split(/\r?\n/);
	const ip = Number(binding.split(" ")[1]);
	const code: Instruction[] = lines.map((line) => {
		const [name, a, b, c] = line.split(" ");
		if (!Object.hasOwn(definitions, name))
			throw new Error(`Unknown instruction ${name}`);
		return [name as Opcode, Number(a), Number(b), Number(c)];
	});
	return { ip, code };
}

export function execute(registers: number[], [name, a, b, c]: Instruction) {
	registers[c] = evaluate(name, registers, a, b);
}

type Pattern = [Opcode, number, number | null, number];
const commutative = new Set<Opcode>(["addr", "mulr", "eqrr", "banr", "borr"]);

export function matchesSequence(code: Instruction[], pattern: Pattern[]) {
	return (
		code.length === pattern.length &&
		pattern.every(([op, a, b, c], i) => {
			const [name, left, right, destination] = code[i];
			if (name !== op || destination !== c) return false;
			if (left === a && (b === null || right === b)) return true;
			return commutative.has(op) && left === b && right === a;
		})
	);
}
