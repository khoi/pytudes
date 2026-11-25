import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`;

test("part one", () => expect(part1(sample)).toBe(110));
test("part two", () => expect(part2(sample)).toBe(20));
