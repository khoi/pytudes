import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("repeats a frequency across passes and includes the starting frequency", () => {
	const sample = "+1\n-2\n+3\n+1";
	expect(part1(sample)).toBe(3);
	expect(part2(sample)).toBe(2);
	expect(part2("+1\n-1")).toBe(0);
	expect(part2("+7\n+7\n-2\n-7\n-4")).toBe(14);
	expect(part2("+1000000000\n-999999999")).toBe(1_000_000_000);
	expect(() => part2("+1")).toThrow("never repeats");
});
