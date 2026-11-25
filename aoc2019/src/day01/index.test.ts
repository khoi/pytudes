import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("fuel for modules and their additional fuel", () => {
	const modules = "12\n14\n1969\n100756";
	expect(part1(modules)).toBe(2 + 2 + 654 + 33583);
	expect(part2(modules)).toBe(2 + 2 + 966 + 50346);
});
