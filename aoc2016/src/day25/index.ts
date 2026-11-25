import { run } from "../../../scripts/aoc.ts";
import { Assembunny } from "../assembunny.ts";

export function clockSignal(input: string, a: number): boolean {
	const cpu = new Assembunny(input, { a });
	const seen = new Map<string, number>();
	let outputs = 0;
	while (cpu.running) {
		const expected = outputs % 2;
		const key = `${cpu.state()},${expected}`;
		const previous = seen.get(key);
		if (previous !== undefined) return previous < outputs;
		seen.set(key, outputs);
		const output = cpu.step();
		if (output !== undefined) {
			if (output !== expected) return false;
			outputs++;
		}
	}
	return false;
}

export function part1(input: string): number {
	for (let a = 1; ; a++) {
		if (clockSignal(input, a)) return a;
	}
}

if (import.meta.main) run(import.meta.url, part1);
