import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("mines the first matching decimal suffix", () => {
	expect(part1("abcdef60904")).toBe(3);
	expect(part2("abcdef674283")).toBe(9);
});
