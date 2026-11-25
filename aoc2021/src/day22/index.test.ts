import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("overlapping reactor instructions", () => {
	const input = `on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10`;
	expect(part1(input)).toBe(39);
	expect(part2(input)).toBe(39);
});
test("initialization cubes are clipped on each axis", () => {
	const input = "on x=-52..-48,y=0..0,z=0..0";
	expect(part1(input)).toBe(3);
	expect(part2(input)).toBe(5);
});
test("counts individual cubes even in large volumes", () => {
	expect(part2("on x=0..1000000,y=0..1000000,z=0..1000000")).toBe(
		1000001n ** 3n,
	);
});
