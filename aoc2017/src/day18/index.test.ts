import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("recover the last sound when the register is nonzero", () => {
	expect(
		part1(
			"set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2",
		),
	).toBe(4);
});

test("two programs transmit until deadlock or termination", () => {
	expect(part2("snd 1\nsnd 2\nsnd p\nrcv a\nrcv b\nrcv c\nrcv d")).toBe(3);
	expect(part2("jgz p 2\nsnd 9\nrcv x\nsnd x")).toBe(1);
});
