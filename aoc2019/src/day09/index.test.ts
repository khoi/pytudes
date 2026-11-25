import { expect, test } from "bun:test";
import { Intcode } from "../intcode.ts";
import { part1, part2 } from "./index.ts";

test("relative addressing, sparse memory and large words", () => {
	const quine = [
		109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
	];
	expect(new Intcode(quine).run()).toEqual(quine);
	expect(part1("1102,34915192,34915192,7,4,7,99,0")).toBe(1219070632396864);
	expect(part2("104,1125899906842624,99")).toBe(1125899906842624);
});

test("a paused machine can be cloned and resumed independently", () => {
	const original = new Intcode("109,400,203,2,204,2,99");
	expect(original.run()).toEqual([]);
	expect(original.waiting).toBe(true);
	const copy = original.clone();
	expect(copy.run([19])).toEqual([19]);
	expect(original.run([23])).toEqual([23]);
	expect(original.halted).toBe(true);
});

test("cloning preserves extended memory beyond the array-index range", () => {
	const machine = new Intcode("4,5000000000,99");
	machine.set(5000000000, 123);
	const clone = machine.clone();
	machine.set(5000000000, 321);
	expect(clone.run()).toEqual([123]);
	expect(machine.run()).toEqual([321]);
});
