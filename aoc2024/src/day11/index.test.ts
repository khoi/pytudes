import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `125 17`;

test("counts stone multiplicities through repeated blinks", () => {
	expect(part1(sample)).toBe(55312n);
	expect(part2(sample)).toBe(65601038650482n);
});
