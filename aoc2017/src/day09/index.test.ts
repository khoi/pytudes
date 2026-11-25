import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("garbage and canceled closers do not create groups", () => {
	expect(part1("{{{},{},{{}}}}")).toBe(16);
	expect(part1("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe(3);
});

test("counts surviving garbage characters", () => {
	expect(part2('<{o"i!a,<{i<a>')).toBe(10);
	expect(part2("<!!!>>")).toBe(0);
});
