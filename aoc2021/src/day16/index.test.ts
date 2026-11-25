import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("nested packet versions", () => {
	expect(part1("8A004A801A8002F478")).toBe(16);
	expect(part1("620080001611562C8802118E34")).toBe(12);
});
test("literal and composed operators", () => {
	expect(part2("D2FE28")).toBe(2021);
	expect(part2("9C0141080250320F1802104A08")).toBe(1);
	expect(part2("04005AC33890")).toBe(54);
});

test("compares packet values exactly above the safe integer limit", () => {
	const literal = "1290842108421084201";
	const adjacentValuesCompared = "1e0084a421084210842108004a42108421084210804";
	expect(part2(literal)).toBe(2n ** 54n + 1n);
	expect(part2(adjacentValuesCompared)).toBe(0);
});
