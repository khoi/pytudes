import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("visits every numbered point, optionally returning to zero", () => {
	const grid =
		"###########\n#0.1.....2#\n#.#######.#\n#4.......3#\n###########";
	expect(part1(grid)).toBe(14);
	expect(part2(grid)).toBe(20);
	expect(part1("0.4")).toBe(2);
});
