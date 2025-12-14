import { readFileSync } from "node:fs";
import { describe, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 07", () => {
	it("part1", () => {});
	it("part2", () => {});
});
