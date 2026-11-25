import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "30373\n25512\n65332\n33549\n35390";
test("visible from the edge", () => expect(part1(sample)).toBe(21));
test("best scenic score", () => expect(part2(sample)).toBe(8));
