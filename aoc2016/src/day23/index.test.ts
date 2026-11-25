import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("instructions can toggle themselves and nearby instructions", () => {
	const program = "cpy 2 a\ntgl a\ntgl a\ntgl a\ncpy 1 a\ndec a\ndec a";
	expect(part1(program)).toBe(3);
	expect(part2(program)).toBe(3);
	expect(part1("inc a")).toBe(8);
	expect(part2("inc a")).toBe(13);
});
