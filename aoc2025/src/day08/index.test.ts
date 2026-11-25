import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 08", () => {
	it("part1", () => {
		expect(part1(sample, 10)).toBe(40);
		expect(part1(input)).toBe(112230);
	});

	it("part2", () => {
		expect(part2(sample)).toBe(25272);
		expect(part2(input)).toBe(2573952864);
	});
});
