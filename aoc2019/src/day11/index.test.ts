import { expect, test } from "bun:test";
import { part1, registration } from "./index.ts";

test("painting two panels preserves orientation and the starting color", () => {
	const robot = "3,40,104,1,104,0,3,40,104,1,104,0,99";
	expect(part1(robot)).toBe(2);
	expect(registration(robot)).toBe("##");
	expect(registration("3,10,4,10,104,0,99")).toBe("#");
});
