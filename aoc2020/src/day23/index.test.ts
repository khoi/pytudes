import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("cup labels after 100 moves and the large game's neighboring pair", () => {
	expect(part1("389125467")).toBe("67384529");
	expect(part2("389125467")).toBe(149245887792);
});
