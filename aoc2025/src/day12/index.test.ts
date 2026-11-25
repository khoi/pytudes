import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 12", () => {
	it("packs the two feasible example regions", () => {
		expect(part1(sample)).toBe(2);
	});

	it("counts the feasible regions in the puzzle input", () => {
		expect(part1(input)).toBe(499);
	});
});
