import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("distinguishes the two initial register states", () => {
	const program = "jio a, +3\ninc b\njmp +3\ninc b\ntpl b";
	expect(part1(program)).toBe(1);
	expect(part2(program)).toBe(3);
});
test("takes signed backward jumps and tests even values", () => {
	const program =
		"inc b\ninc b\ninc b\ninc b\nhlf b\njie b, -1\njio b, +2\ntpl b";
	expect(part1(program)).toBe(1);
});
