import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("a repeated biodiversity rating and ten minutes of nested bugs", () => {
	const bugs = "....#\n#..#.\n#..##\n..#..\n#....";
	expect(part1(bugs)).toBe(2129920);
	expect(part2(bugs, 10)).toBe(99);
	expect(part2(".....\n.....\n.....\n.....\n.....")).toBe(0);
});
