import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts distinct houses across interleaved walks", () => {
	expect(part1("^>v<")).toBe(4);
	expect(part2("^>v<")).toBe(3);
	expect(part2("^v^v^v^v^v")).toBe(11);
});
