import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 02", () => {
	it("part1", () => {
		expect(part1(sample)).toBe(1227775554);
		expect(part1(input)).toBe(52316131093);
	});

	it("part2", () => {
		expect(part2(sample)).toBe(4174379265);
		expect(part2(input)).toBe(69564213293);
	});
});
