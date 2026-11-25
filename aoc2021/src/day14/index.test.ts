import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("polymer element frequencies", () => {
	const polymer = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
	expect(part1(polymer)).toBe(1588);
	expect(part2(polymer)).toBe(2188189693529);
});
