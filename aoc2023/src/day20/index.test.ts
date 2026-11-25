import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("pulse counts over one thousand presses", () => {
	expect(
		part1("broadcaster -> a, b, c\n%a -> b\n%b -> c\n%c -> inv\n&inv -> a"),
	).toBe(32000000);
	expect(
		part1(
			"broadcaster -> a\n%a -> inv, con\n&inv -> b\n%b -> con\n&con -> output",
		),
	).toBe(11687500);
});

test("conjunctions retain the previous value between presses", () => {
	expect(
		part2("broadcaster -> a, b\n%a -> gate\n%b -> c\n%c -> gate\n&gate -> rx"),
	).toBe(3n);
	expect(part2("broadcaster -> a\n%a -> rx")).toBe(2n);
});

test("an always-low conjunction input prevents synchronization", () => {
	expect(() =>
		part2("broadcaster -> a, gate\n%a -> gate\n&gate -> rx"),
	).toThrow("never receives");
});

test("phased feedback rings first overlap after their individual periods", () => {
	const network = `broadcaster -> a, x
%a -> b, ab
%b -> a, ab
&ab -> left
&left -> gate
%x -> y, xyz
%y -> z, xyz
%z -> x, xyz
&xyz -> right
&right -> gate
&gate -> rx`;
	expect(part2(network)).toBe(15n);
});
