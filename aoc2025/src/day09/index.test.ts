import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 09", () => {
	it("part1", () => {
		expect(part1(sample)).toBe(50);
	});

	it("part2", () => {
		expect(part2(sample)).toBe(24);
	});
});
