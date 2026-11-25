import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("arcade tile updates and automatic joystick", () => {
	expect(
		part1("104,1,104,2,104,2,104,1,104,2,104,0,104,2,104,2,104,2,99"),
	).toBe(1);
	expect(
		part2(
			"2,0,0,40,104,8,104,0,104,3,104,6,104,0,104,4,3,40,104,-1,104,0,4,40,99",
		),
	).toBe(-1);
});
