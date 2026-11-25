import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("deterministic rolls and quantum universes", () => {
	const input = "Player 1 starting position: 4\nPlayer 2 starting position: 8";
	expect(part1(input)).toBe(739785);
	expect(part2(input)).toBe(444356092776315);
});
