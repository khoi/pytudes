export type Instruction = [opcode: string, x: string, y: string];
export type Registers = Map<string, number>;

export function parseAssembly(input: string): Instruction[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.trim().split(/\s+/) as Instruction);
}

export function value(operand: string, registers: Registers): number {
	return /^-?\d+$/.test(operand)
		? Number(operand)
		: (registers.get(operand) ?? 0);
}
