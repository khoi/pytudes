import { expect, test } from "bun:test";
import { shuffle } from "./index.ts";

test("card positions can be mapped in either direction", () => {
	const deck = shuffle(
		"deal with increment 7\ndeal into new stack\ndeal into new stack",
		10n,
		1n,
	);
	expect(
		Array.from({ length: 10 }, (_, i) => Number(deck.cardAt(BigInt(i)))),
	).toEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7]);
	expect(deck.positionOf(8n)).toBe(6n);
});
test("repeated cuts work for a translation with scale one", () => {
	const deck = shuffle("cut -3", 10n, 17n);
	expect(deck.cardAt(0n)).toBe(9n);
	expect(deck.positionOf(9n)).toBe(0n);
});
