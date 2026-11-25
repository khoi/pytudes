import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("diagnostic report", () => {
	const report =
		"00100\n11110\n10110\n10111\n10101\n01111\n00111\n11100\n10000\n11001\n00010\n01010";
	expect(part1(report)).toBe(198);
	expect(part2(report)).toBe(230);
	expect(part2("10\n11")).toBe(6);
});
