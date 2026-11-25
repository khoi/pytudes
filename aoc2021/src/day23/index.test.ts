import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("least energy for the folded and unfolded burrow", () => {
	const input = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;
	expect(part1(input)).toBe(12521);
	expect(part2(input)).toBe(44169);
});
