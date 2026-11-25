import { readFileSync } from "node:fs";
import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

describe("Day 11", () => {
	it("counts paths from you", () => {
		expect(part1(sample)).toBe(5);
		expect(part1(input)).toBe(470);
	});

	it("requires both visits", () => {
		const network = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;
		expect(part2(network)).toBe(2);
		expect(part2("svr: dac\ndac: fft\nfft: out")).toBe(1);
		expect(part2(input)).toBe(384151614084875);
	});
});
