import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;

test("part one", () => expect(part1(sample)).toBe(64));
test("part two", () => expect(part2(sample)).toBe(58));
