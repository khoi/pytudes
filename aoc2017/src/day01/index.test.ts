import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("adjacent equal digits include the wraparound pair", () => {
	expect(part1("1122")).toBe(3);
	expect(part1("91212129\n")).toBe(9);
	expect(part1("1111")).toBe(4);
});

test("matches halfway around the circle", () => {
	expect(part2("1212")).toBe(6);
	expect(part2("1221")).toBe(0);
	expect(part2("123425")).toBe(4);
});
