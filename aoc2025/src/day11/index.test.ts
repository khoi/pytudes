import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");

describe("Day 11", () => {
	it("part1 sample", () => {
		expect(part1(sample)).toBe(5);
	});
});
