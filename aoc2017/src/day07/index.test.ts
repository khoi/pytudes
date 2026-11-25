import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the base and corrects the deepest imbalance", () => {
	const sample = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`;
	expect(part1(sample)).toBe("tknk");
	expect(part2(sample)).toBe(60);
});

test("the expected subtree weight disambiguates two children", () => {
	const sample = "r (1) -> a, b, c\na (8)\nb (8)\nc (2) -> d, e\nd (3)\ne (5)";
	expect(part2(sample)).toBe(3);
});
