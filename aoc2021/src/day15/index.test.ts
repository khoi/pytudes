import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("lowest risk through tiled cave", () => {
	const cave = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;
	expect(part1(cave)).toBe(40);
	expect(part2(cave)).toBe(315);
});
