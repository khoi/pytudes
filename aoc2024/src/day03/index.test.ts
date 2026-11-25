import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test("ignores corrupted instructions and respects switches", () => {
	expect(part1(sample)).toBe(161);
	expect(
		part2(
			"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
		),
	).toBe(48);
});

test("rejects operands with more than three digits", () => {
	expect(part1("mul(1000,1)mul(9,04)")).toBe(36);
});
