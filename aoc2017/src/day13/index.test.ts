import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("scanner phases determine severity and delay", () => {
	const layers = "0: 3\n1: 2\n4: 4\n6: 4";
	expect(part1(layers)).toBe(24);
	expect(part2(layers)).toBe(10);
});

test("a stationary scanner cannot be avoided", () => {
	expect(() => part2("1: 1")).toThrow("No safe delay");
});
