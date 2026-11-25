import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("walk to ZZZ", () => {
	const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
	expect(part1(input)).toBe(2);
});

test("simultaneous ghost walks", () => {
	const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
	expect(part2(input)).toBe(6n);
});

test("different cycle phases", () => {
	const input = `L

11A = (11Z, 11Z)
11Z = (11B, 11B)
11B = (11Z, 11Z)
22A = (22B, 22B)
22B = (22Z, 22Z)
22Z = (22C, 22C)
22C = (22B, 22B)`;
	expect(part2(input)).toBe(5n);
});
