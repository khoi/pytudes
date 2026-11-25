import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("trace the tubes through turns, letters and crossings", () => {
	const map = [
		"     |",
		"     |  +--+",
		"     A  |  C",
		" F---|----E|--+",
		"     |  |  |  D",
		"     +B-+  +--+",
	].join("\n");
	expect(part1(map)).toBe("ABCDEF");
	expect(part2(map)).toBe(38);
});
