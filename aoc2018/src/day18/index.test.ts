import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the wooded area evolves one minute at a time", () => {
	expect(
		part1(`.#.#...|#.
.....#|##|
.|..|...#.
..|#.....#
#.#|||#|#|
...#.||...
.|....|...
||...#|.#|
|.||||..|.
...#.|..|.`),
	).toBe(1147);
	expect(part2("...\n...")).toBe(0);
});
