import { expect, test } from "bun:test";
import { evaluate } from "./assembunny.ts";

test("accelerates terminating signed addition and multiplication loops", () => {
	const addition = "inc b\ndec a\njnz b -2";
	expect(evaluate(addition, { a: 4, b: -7 })).toEqual({
		a: -3,
		b: 0,
		c: 0,
		d: 0,
	});
	const multiply = "cpy a b\ninc b\ninc c\njnz b -2\ndec d\njnz d -5";
	expect(evaluate(multiply, { a: -4, d: 200 })).toEqual({
		a: -4,
		b: 0,
		c: 800,
		d: 0,
	});
});

test("re-evaluates a counter source modified inside the outer loop", () => {
	const code = "cpy a b\ninc a\ndec b\njnz b -2\ndec d\njnz d -5";
	expect(evaluate(code, { a: 2, d: 3 }).a).toBe(16);
});
