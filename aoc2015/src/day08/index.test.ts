import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("accounts for surrounding quotes and escaped characters", () => {
	const literals = String.raw`""
"abc"
"aaa\"aaa"
"\x27"`;
	expect(part1(literals)).toBe(12);
	expect(part2(literals)).toBe(19);
});
