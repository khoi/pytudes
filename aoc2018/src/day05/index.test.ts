import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("adjacent opposite polarities react repeatedly", () => {
	expect(part1("dabAcCaCBAcCcaDA")).toBe(10);
	expect(part2("dabAcCaCBAcCcaDA")).toBe(4);
	expect(part1("abBA")).toBe(0);
});
