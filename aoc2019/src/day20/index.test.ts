import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const maze = `         A
         A
  #######.#########
  #######.........#
  #######.#######.#
  #######.#######.#
  #######.#######.#
  #####  B    ###.#
BC...##  C    ###.#
  ##.##       ###.#
  ##...DE  F  ###.#
  #####    G  ###.#
  #########.#####.#
DE..#######...###.#
  #.#########.###.#
FG..#########.....#
  ###########.#####
             Z
             Z`;

test("walking through a portal costs one step", () => {
	expect(part1(maze)).toBe(23);
});
test("outer portals lead up a level in the recursive maze", () => {
	expect(part2(maze)).toBe(26);
});
test("a solution can require walking between two outer portals at depth one", () => {
	const nested = `  ################
AA.....PQ ########
  ################
PQ...#############
  ##.#############
RS...#############
  ################
ZZ.....RS ########
  ################`;
	expect(part2(nested)).toBe(16);
});
