import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("sonar sweep", () => {
	const depths = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263";
	expect(part1(depths)).toBe(7);
	expect(part2(depths)).toBe(5);
});
