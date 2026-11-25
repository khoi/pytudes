import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("decode a scrambled display", () => {
	const signals = "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab";
	expect(part1(signals + " | ab dab eafb acedgfb")).toBe(4);
	expect(part2(signals + " | cdfeb fcadb cdfeb cdbaf")).toBe(5353);
});
