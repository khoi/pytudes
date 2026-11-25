import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("choose model numbers in digit order and carry registers across inputs", () => {
	const program = "inp z\ninp x\nmul z 3\neql z x\neql z 0";
	expect(part1(program)).toBe(39);
	expect(part2(program)).toBe(13);
});

test("base-26 stack pairs constrain digits across nested blocks", () => {
	const block = (div: number, compare: number, add: number) => `inp w
mul x 0
add x z
mod x 26
div z ${div}
add x ${compare}
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y ${add}
mul y x
add z y`;
	const input = [
		block(1, 12, 4),
		block(1, 11, 3),
		block(26, -5, 6),
		block(26, -1, 8),
	].join("\n");
	expect(part1(input)).toBe(6979);
	expect(part2(input)).toBe(1314);
});
