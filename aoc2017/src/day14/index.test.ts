import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts used squares and four-connected regions", () => {
	expect(part1("flqrgnkx")).toBe(8108);
	expect(part2("flqrgnkx")).toBe(1242);
});
