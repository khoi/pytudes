import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("propagates plants and skips repeating shapes with a drift", () => {
	const sample = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;
	expect(part1(sample)).toBe(325);
	expect(part2("initial state: #\n\n.#... => #")).toBe(50_000_000_000);
});
