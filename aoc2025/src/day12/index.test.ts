import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 12", () => {
	it("part1", () => {
		expect(part1(input)).toBe(499);
	});

	it("part2", () => {
		expect(part2(input)).toBe(1);
	});
});
