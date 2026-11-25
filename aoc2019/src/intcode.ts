export class Intcode {
	private memory: number[];
	private extended = new Map<number, number>();
	private pointer = 0;
	private base = 0;
	private inputs: number[] = [];
	halted = false;
	waiting = false;

	constructor(program: string | number[]) {
		this.memory =
			typeof program === "string"
				? program.trim().split(",").map(Number)
				: program.slice();
	}

	get(address: number): number {
		if (!Number.isSafeInteger(address) || address < 0)
			throw new Error(`Invalid memory address ${address}`);
		return address < this.memory.length
			? this.memory[address]
			: (this.extended.get(address) ?? 0);
	}

	set(address: number, value: number): void {
		if (!Number.isSafeInteger(address) || address < 0)
			throw new Error(`Invalid memory address ${address}`);
		if (address < this.memory.length) this.memory[address] = value;
		else this.extended.set(address, value);
	}

	clone(): Intcode {
		const copy = new Intcode(this.memory);
		copy.extended = new Map(this.extended);
		copy.pointer = this.pointer;
		copy.base = this.base;
		copy.inputs = this.inputs.slice();
		copy.halted = this.halted;
		copy.waiting = this.waiting;
		return copy;
	}

	run(inputs: number[] = [], maxSteps = Infinity): number[] {
		this.inputs.push(...inputs);
		this.waiting = false;
		const output: number[] = [];
		for (let steps = 0; !this.halted && steps < maxSteps; steps++) {
			const instruction = this.get(this.pointer);
			const opcode = instruction % 100;
			const mode = (offset: number) =>
				Math.floor(instruction / 10 ** (offset + 1)) % 10;
			const address = (offset: number) => {
				const parameter = this.get(this.pointer + offset);
				switch (mode(offset)) {
					case 0:
						return parameter;
					case 1:
						return this.pointer + offset;
					case 2:
						return this.base + parameter;
					default:
						throw new Error(`Invalid parameter mode at ${this.pointer}`);
				}
			};
			const read = (offset: number) => this.get(address(offset));
			const write = (offset: number, value: number) => {
				if (mode(offset) === 1) throw new Error("Immediate-mode write");
				this.set(address(offset), value);
			};

			switch (opcode) {
				case 1:
					write(3, read(1) + read(2));
					this.pointer += 4;
					break;
				case 2:
					write(3, read(1) * read(2));
					this.pointer += 4;
					break;
				case 3: {
					const value = this.inputs.shift();
					if (value === undefined) {
						this.waiting = true;
						return output;
					}
					write(1, value);
					this.pointer += 2;
					break;
				}
				case 4:
					output.push(read(1));
					this.pointer += 2;
					break;
				case 5:
					this.pointer = read(1) !== 0 ? read(2) : this.pointer + 3;
					break;
				case 6:
					this.pointer = read(1) === 0 ? read(2) : this.pointer + 3;
					break;
				case 7:
					write(3, Number(read(1) < read(2)));
					this.pointer += 4;
					break;
				case 8:
					write(3, Number(read(1) === read(2)));
					this.pointer += 4;
					break;
				case 9:
					this.base += read(1);
					this.pointer += 2;
					break;
				case 99:
					this.halted = true;
					break;
				default:
					throw new Error(`Unknown opcode ${opcode} at ${this.pointer}`);
			}
		}
		return output;
	}
}
