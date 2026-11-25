import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `1
2
-3
3
-2
0
4`;

test("part one", () => expect(part1(sample)).toBe(3));
test("part two", () => expect(part2(sample)).toBe(1623178306));
