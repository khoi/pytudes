import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("one optional small-cave revisit", () => {
	const caves = "start-A\nstart-b\nA-c\nA-b\nb-d\nA-end\nb-end";
	expect(part1(caves)).toBe(10);
	expect(part2(caves)).toBe(36);
});
