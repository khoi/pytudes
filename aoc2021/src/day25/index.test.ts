import { test, expect } from "bun:test";
import { part1 } from "./index.ts";

test("simultaneous herd moves finish after 58 steps", () => {
	const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;
	expect(part1(input)).toBe(58);
	expect(part1(">v")).toBe(1);
});
