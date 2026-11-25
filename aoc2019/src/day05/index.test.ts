import { expect, test } from "bun:test";
import { Intcode } from "../intcode.ts";
import { part1, part2 } from "./index.ts";

test("diagnostics echo the selected system and process comparisons", () => {
	expect(part1("3,0,104,0,4,0,99")).toBe(1);
	expect(part2("3,0,4,0,99")).toBe(5);
	const program =
		"3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";
	for (const [value, result] of [
		[7, 999],
		[8, 1000],
		[9, 1001],
	])
		expect(new Intcode(program).run([value])).toEqual([result]);
});
