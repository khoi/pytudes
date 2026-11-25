import { expect, test } from "bun:test";
import { execute, part2 } from "./index.ts";

test("Intcode adjusts the alarm using position parameters", () => {
	expect(execute("1,0,0,0,99", 0, 0)).toBe(2);
	expect(execute("1,1,1,4,99,5,6,0,99", 1, 1)).toBe(30);
	expect(part2("1,0,0,0,99", 198)).toBe(404);
});
