import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("stabilizes adjacent and visible seating rules", () => {
	const seats = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
	expect(part1(seats)).toBe(37);
	expect(part2(seats)).toBe(26);
});
