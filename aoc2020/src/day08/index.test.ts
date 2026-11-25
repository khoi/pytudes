import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("detects repeated instructions and repairs one jump", () => {
	const program =
		"nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6";
	expect(part1(program)).toBe(5);
	expect(part2(program)).toBe(8);
});
