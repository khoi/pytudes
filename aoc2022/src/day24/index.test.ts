import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

test("part one", () => expect(part1(sample)).toBe(18));
test("part two", () => expect(part2(sample)).toBe(54));
