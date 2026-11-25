import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

test("counts the ways to assemble each design", () => {
	expect(part1(sample)).toBe(6);
	expect(part2(sample)).toBe(16);
});
