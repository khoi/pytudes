import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("minimizes size and then product", () => {
	const weights = "1\n2\n3\n4\n5\n7\n8\n9\n10\n11";
	expect(part1(weights)).toBe(99n);
	expect(part2(weights)).toBe(44n);
});
test("requires the rest of the packages to split evenly", () => {
	expect(part1("1 2 3 4 5 9 10 12 14")).toBe(90n);
});
