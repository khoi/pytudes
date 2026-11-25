import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 07", () => {
	it("part1", () => {
		expect(part1(sample)).toBe(21);
		expect(part1(input)).toBe(1524);
	});

	it("part2", () => {
		expect(part2("S.\n^.")).toBe(2);
		expect(part2(sample)).toBe(40);
		expect(part2(input)).toBe(32982105837605);
	});
});
