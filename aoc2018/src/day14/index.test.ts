import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("recipes after an offset and first occurrence of a recipe sequence", () => {
	expect(part1("9")).toBe("5158916779");
	expect(part1("5")).toBe("0124515891");
	expect(part2("51589")).toBe(9);
	expect(part2("01245")).toBe(5);
	expect(part2("59414")).toBe(2018);
	expect(part2("37")).toBe(0);
});
