import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

test("distinguishes peaks from paths reaching each peak", () => {
	expect(part1(sample)).toBe(36);
	expect(part2(sample)).toBe(81);
});
