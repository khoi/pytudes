import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("ignores red-valued objects only when asked", () => {
	const document = '[1,{"c":"red","b":2},3]';
	expect(part1(document)).toBe(6);
	expect(part2(document)).toBe(4);
	expect(part2('{"red":[1,"red",-4]}')).toBe(-3);
});
