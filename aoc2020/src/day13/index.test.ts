import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the first bus and aligns all offsets", () => {
	const buses = "939\n7,13,x,x,59,x,31,19";
	expect(part1(buses)).toBe(295);
	expect(part2(buses)).toBe(1068781n);
	expect(part2("0\n67,x,7,59,61")).toBe(779210n);
	expect(part1("21\n7,5")).toBe(0);
	expect(part2("0\n6,x,8")).toBe(6n);
});
