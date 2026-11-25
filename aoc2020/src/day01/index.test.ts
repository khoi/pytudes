import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("expense report finds two and three distinct entries", () => {
	const report = "1721\n979\n366\n299\n675\n1456";
	expect(part1(report)).toBe(514579);
	expect(part2(report)).toBe(241861950);
	expect(part1("1010\n1010")).toBe(1020100);
	expect(() => part1("1010")).toThrow();
});
