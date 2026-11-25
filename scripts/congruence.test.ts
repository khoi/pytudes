import { expect, test } from "bun:test";
import { combine, firstAlignment } from "./congruence.ts";

test("overlapping cycles can share a factor and use negative phases", () => {
	expect(combine({ at: -1n, period: 6n }, { at: 3n, period: 4n })).toEqual({
		at: 11n,
		period: 12n,
	});
	expect(
		combine({ at: 1n, period: 6n }, { at: 2n, period: 4n }),
	).toBeUndefined();
});

test("alignment considers every possible phase after the lower bound", () => {
	const groups = [
		[
			{ at: 0n, period: 4n },
			{ at: 1n, period: 4n },
		],
		[{ at: 1n, period: 3n }],
	];
	expect(firstAlignment(groups, 5n)).toBe(13n);
	expect(firstAlignment(groups, 16n)).toBe(16n);
	expect(firstAlignment([[]], 1n)).toBeUndefined();
});
