import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the nearest and earliest wire crossings can differ", () => {
	const wires = "R8,U5,L5,D3\nU7,R6,D4,L4";
	expect(part1(wires)).toBe(6);
	expect(part2(wires)).toBe(30);
	const loops = "R2,L2,U1\nU1";
	expect(part1(loops)).toBe(1);
	expect(part2(loops)).toBe(6);
});
