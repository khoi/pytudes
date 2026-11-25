import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("value masking preserves the last write to each address", () => {
	expect(
		part1(
			"mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0",
		),
	).toBe(165n);
});

test("floating addresses can overlap", () => {
	expect(
		part2(
			"mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1",
		),
	).toBe(208n);
	expect(part2("mask = " + "X".repeat(36) + "\nmem[0] = 7")).toBe(7n << 36n);
});
