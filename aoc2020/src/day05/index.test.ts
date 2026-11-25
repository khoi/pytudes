import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("decodes boarding passes and locates an interior gap", () => {
	expect(part1("BFFFBBFRRR\nFFFBBBFRRR\nBBFFBBFRLL")).toBe(820);
	expect(part2("FFFFFFBLRL\nFFFFFFBRLL")).toBe(11);
});
