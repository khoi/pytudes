import { expect, test } from "bun:test";
import { part1 } from "./index.ts";

const sample = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;

test("fits keys into locks without overlapping pins", () => {
	expect(part1(sample)).toBe(3);
});
