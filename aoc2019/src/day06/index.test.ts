import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("orbit checksum and transfers across a common ancestor", () => {
	const orbits = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L";
	expect(part1(orbits)).toBe(42);
	expect(part2(orbits + "\nK)YOU\nI)SAN")).toBe(4);
});
