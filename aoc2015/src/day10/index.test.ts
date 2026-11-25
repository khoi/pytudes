import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("applies the look-and-say expansion forty or fifty times", () => {
	expect(part1("1")).toBe(82350);
	expect(part2("1")).toBe(1166642);
});
