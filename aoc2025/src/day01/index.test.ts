import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");

describe("Day 01", () => {
	it("part1 - sample", () => {
		expect(part1(sample)).toBe(0);
	});

	it("part2 - sample", () => {
		expect(part2(sample)).toBe(0);
	});
});
