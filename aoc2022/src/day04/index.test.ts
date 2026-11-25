import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8";
test("fully contained shifts", () => expect(part1(sample)).toBe(2));
test("overlapping shifts", () => expect(part2(sample)).toBe(4));
