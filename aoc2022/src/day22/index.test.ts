import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

test("part one", () => expect(part1(sample)).toBe(6032));
test("part two", () => expect(part2(sample)).toBe(5031));
