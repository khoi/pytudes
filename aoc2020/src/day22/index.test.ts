import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("standard and recursive combat", () => {
	const input = "Player 1:\n9\n2\n6\n3\n1\n\nPlayer 2:\n5\n8\n4\n7\n10";
	expect(part1(input)).toBe(306);
	expect(part2(input)).toBe(291);
});

test("a repeated game state awards the game to the first player", () => {
	expect(part2("Player 1:\n43\n19\n\nPlayer 2:\n2\n29\n14")).toBe(105);
});
