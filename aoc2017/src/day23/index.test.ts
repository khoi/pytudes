import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("count multiplications and read the final register", () => {
	const code = "set h 2\nset b 3\nmul h 2\nsub b 1\njnz b -2\nsub h a";
	expect(part1(code)).toBe(3);
	expect(part2(code)).toBe(15);
});

test("factor testing loops preserve counts and register values", () => {
	const loop = [
		"set f 1",
		"set d 2",
		"set e 2",
		"set g d",
		"mul g e",
		"sub g b",
		"jnz g 2",
		"set f 0",
		"sub e -1",
		"set g e",
		"sub g b",
		"jnz g -8",
		"sub d -1",
		"set g d",
		"sub g b",
		"jnz g -13",
		"set h f",
		"mul h d",
		"sub h e",
		"sub h g",
	].join("\n");
	expect(part1("set b 7\n" + loop)).toBe(26);
	expect(part2("set b 7\n" + loop)).toBe(0);
	expect(part2("set b 8\n" + loop)).toBe(-8);
});
