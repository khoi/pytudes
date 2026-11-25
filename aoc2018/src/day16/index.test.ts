import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("three operations match the example", () => {
	expect(part1("Before: [3, 2, 1, 1]\n9 2 1 2\nAfter:  [3, 2, 2, 1]")).toBe(1);
});

test("deduces seti and executes the program", () => {
	expect(
		part2("Before: [0, 0, 0, 0]\n1 9 0 0\nAfter:  [9, 0, 0, 0]\n\n1 42 0 0"),
	).toBe(42);
});
