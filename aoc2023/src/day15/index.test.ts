import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("holiday lens boxes", () => {
	const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
	expect(part1(input)).toBe(1320);
	expect(part2(input)).toBe(145);
});
