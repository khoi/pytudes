import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("removes the seventh counterclockwise marble on multiples of 23", () => {
	expect(part1("9 players; last marble is worth 25 points")).toBe(32);
	expect(part1("10 players; last marble is worth 1618 points")).toBe(8317);
	expect(part2("9 players; last marble is worth 25 points")).toBe(22563);
});
