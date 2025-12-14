import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 10", () => {
	it("part1 sample", () => {
		expect(part1(sample)).toBe(7);
	});

	it("part2 sample", () => {
		expect(part2(sample)).toBe(33);
	});

	it("part1", () => {
		expect(part1(input)).toBe(441);
	});

	it("part2", () => {
		expect(part2(input)).toBe(18559);
	});
});
