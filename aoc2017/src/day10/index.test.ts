import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("reversals wrap around the end of the ring", () => {
	expect(part1("3,4,1,5", 5)).toBe(12);
});

test("dense hash preserves leading zeroes", () => {
	expect(part2("")).toBe("a2582a3a0e66e6e86e3812dcb672a272");
	expect(part2("AoC 2017\n")).toBe("33efeb34ea91902bb2f59c9920caa6cd");
	expect(part2("1,2,3")).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
});
