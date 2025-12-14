import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 04", () => {
	it("part1", () => {
		expect(part1(sample)).toBe(13);
		expect(part1(input)).toBe(1587);
	});

	it("part2", () => {
		expect(part2(sample)).toBe(43);
		expect(part2(input)).toBe(8946);
	});
});
