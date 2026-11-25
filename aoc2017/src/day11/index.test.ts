import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("distance on the hex grid", () => {
	expect(part1("ne,ne,ne")).toBe(3);
	expect(part1("ne,ne,sw,sw")).toBe(0);
	expect(part1("ne,ne,s,s")).toBe(2);
	expect(part1("se,sw,se,sw,sw")).toBe(3);
});

test("remembers the furthest point before returning", () => {
	expect(part2("ne,ne,sw,sw")).toBe(2);
});
