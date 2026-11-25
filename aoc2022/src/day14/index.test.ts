import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "498,4 -> 498,6 -> 496,6\n503,4 -> 502,4 -> 502,9 -> 494,9";
test("sand before falling into the abyss", () =>
	expect(part1(sample)).toBe(24));
test("sand until the source blocks", () => expect(part2(sample)).toBe(93));
