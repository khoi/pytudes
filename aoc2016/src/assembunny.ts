export type Registers = Record<"a" | "b" | "c" | "d", number>;

type Instruction = { op: string; x: string; y: string };

function isRegister(value: string): value is keyof Registers {
	return value === "a" || value === "b" || value === "c" || value === "d";
}

function increment(op: string): number {
	return op === "inc" ? 1 : op === "dec" ? -1 : 0;
}

export class Assembunny {
	readonly registers: Registers;
	private readonly program: Instruction[];
	private ip = 0;
	private programKey = "";

	constructor(input: string, initial: Partial<Registers> = {}) {
		this.program = input
			.trim()
			.split(/\r?\n/)
			.map((line) => {
				const [op, x, y = ""] = line.trim().split(/\s+/);
				return { op, x, y };
			});
		this.registers = { a: 0, b: 0, c: 0, d: 0, ...initial };
	}

	get running(): boolean {
		return this.ip >= 0 && this.ip < this.program.length;
	}

	state(): string {
		const { a, b, c, d } = this.registers;
		return `${this.ip},${a},${b},${c},${d},${this.programKey}`;
	}

	private value(operand: string): number {
		return isRegister(operand) ? this.registers[operand] : Number(operand);
	}

	private additionLoop(ip: number) {
		const first = this.program[ip],
			second = this.program[ip + 1],
			jump = this.program[ip + 2];
		if (jump?.op !== "jnz" || jump.y !== "-2") return;
		const [counter, target] =
			jump.x === first.x ? [first, second] : [second, first];
		if (
			jump.x !== counter.x ||
			!isRegister(counter.x) ||
			!isRegister(target.x) ||
			counter.x === target.x
		)
			return;
		const counterStep = increment(counter.op),
			targetStep = increment(target.op);
		if (counterStep && targetStep)
			return { counter: counter.x, target: target.x, counterStep, targetStep };
	}

	private multiply(copy: Instruction): boolean {
		const outer = this.program[this.ip + 4],
			jump = this.program[this.ip + 5];
		if (
			jump?.op !== "jnz" ||
			jump.y !== "-5" ||
			jump.x !== outer.x ||
			!isRegister(outer.x)
		)
			return false;
		const loop = this.additionLoop(this.ip + 1);
		if (
			!loop ||
			loop.counter !== copy.y ||
			outer.x === loop.counter ||
			outer.x === loop.target
		)
			return false;
		if (copy.x === loop.counter || copy.x === loop.target || copy.x === outer.x)
			return false;
		const innerCount = -this.value(copy.x) * loop.counterStep;
		const outerCount = -this.registers[outer.x] * increment(outer.op);
		if (innerCount <= 0 || outerCount <= 0) return false;
		this.registers[loop.target] += innerCount * outerCount * loop.targetStep;
		this.registers[loop.counter] = 0;
		this.registers[outer.x] = 0;
		this.ip += 6;
		return true;
	}

	step(): number | undefined {
		const instruction = this.program[this.ip];
		const { op, x, y } = instruction;
		switch (op) {
			case "cpy":
				if (this.multiply(instruction)) return;
				if (isRegister(y)) this.registers[y] = this.value(x);
				break;
			case "inc":
			case "dec": {
				const loop = this.additionLoop(this.ip);
				if (loop) {
					const count = -this.registers[loop.counter] * loop.counterStep;
					if (count > 0) {
						this.registers[loop.target] += count * loop.targetStep;
						this.registers[loop.counter] = 0;
						this.ip += 3;
						return;
					}
				}
				if (isRegister(x)) this.registers[x] += increment(op);
				break;
			}
			case "jnz":
				if (this.value(x) !== 0) {
					this.ip += this.value(y);
					return;
				}
				break;
			case "tgl": {
				const target = this.program[this.ip + this.value(x)];
				if (target) {
					if (target.y) target.op = target.op === "jnz" ? "cpy" : "jnz";
					else target.op = target.op === "inc" ? "dec" : "inc";
					this.programKey = this.program.map((inst) => inst.op).join(",");
				}
				break;
			}
			case "out":
				this.ip++;
				return this.value(x);
			default:
				throw new Error(`Unknown Assembunny instruction: ${op}`);
		}
		this.ip++;
	}
}

export function evaluate(
	input: string,
	initial: Partial<Registers> = {},
): Registers {
	const cpu = new Assembunny(input, initial);
	while (cpu.running) cpu.step();
	return cpu.registers;
}
