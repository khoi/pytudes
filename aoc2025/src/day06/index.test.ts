import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 06", () => {
	it("part1", () => {
		expect(part1(sample)).toBe(4277556);
		expect(part1(input)).toBe(5782351442566);
	});

	it("part2", () => {
		expect(part2(" 3\n12\n+")).toBe(33);
		expect(part2(sample)).toBe(3263827);
		expect(part2(input)).toBe(10194584711842);
	});
});
