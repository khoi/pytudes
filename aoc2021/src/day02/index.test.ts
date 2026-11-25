import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("submarine course", () => {
	const course = "forward 5\ndown 5\nforward 8\nup 3\ndown 8\nforward 2";
	expect(part1(course)).toBe(150);
	expect(part2(course)).toBe(900);
});
