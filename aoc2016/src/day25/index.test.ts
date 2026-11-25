import { expect, test } from "bun:test";
import { part1, clockSignal } from "./index.ts";

test("accepts only a repeating alternating signal", () => {
	const signal = "dec a\nout a\ninc a\nout a\njnz 1 -4";
	expect(part1(signal)).toBe(1);
	expect(clockSignal(signal, 2)).toBe(false);
	expect(clockSignal("out 0\nout 1", 1)).toBe(false);
	expect(clockSignal("out 0\nout 1\njnz 1 0", 1)).toBe(false);
});
