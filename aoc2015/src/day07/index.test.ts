import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("evaluates dependent 16-bit wires and overrides b on the second run", () => {
	expect(part1("123 -> x\n456 -> y\nx AND y -> a")).toBe(72);
	expect(part1("123 -> x\nNOT x -> a")).toBe(65412);
	expect(part2("3 -> b\nb LSHIFT 2 -> a")).toBe(48);
});
