import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

test("finds the cheapest valid button presses", () => {
	expect(part1(sample)).toBe(480);
	expect(part2(sample)).toBe(875318608908);
});

test("uses the cheaper mix for collinear buttons", () => {
	expect(part1("Button A: X+2, Y+4\nButton B: X+1, Y+2\nPrize: X=4, Y=8")).toBe(
		4,
	);
});
