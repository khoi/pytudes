import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("rotates the ship heading or its relative waypoint", () => {
	const route = "F10\nN3\nF7\nR90\nF11";
	expect(part1(route)).toBe(25);
	expect(part2(route)).toBe(286);
	expect(part1("F2 L180 F1")).toBe(1);
});
