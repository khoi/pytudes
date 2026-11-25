import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "A Y\nB X\nC Z";
test("score by chosen shape", () => expect(part1(sample)).toBe(15));
test("score by required outcome", () => expect(part2(sample)).toBe(12));
