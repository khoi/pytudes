import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `2333133121414131402`;

test("compacts individual blocks and then whole files", () => {
	expect(part1(sample)).toBe(1928);
	expect(part2(sample)).toBe(2858);
});

test("merges neighboring gaps around a zero-length file", () => {
	expect(part2("12023")).toBe(12);
});
