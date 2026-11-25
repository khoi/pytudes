import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample =
	"1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000";

test("largest food supply", () => expect(part1(sample)).toBe(24000));
test("top three elves", () => expect(part2(sample)).toBe(45000));
test("count the final group without a trailing separator", () => {
	const supplies = "2\n\n9\n\n3\n\n8\n\n10";
	expect(part1(supplies)).toBe(10);
	expect(part2(supplies)).toBe(27);
});
