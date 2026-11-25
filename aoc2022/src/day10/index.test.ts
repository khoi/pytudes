import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = await Bun.file(new URL("./sample.txt", import.meta.url)).text();
test("signal every forty cycles", () => expect(part1(sample)).toBe(13140));
test("sprite position across all six scanlines", () =>
	expect(part2(sample)).toBe(
		[
			"##..##..##..##..##..##..##..##..##..##..",
			"###...###...###...###...###...###...###.",
			"####....####....####....####....####....",
			"#####.....#####.....#####.....#####.....",
			"######......######......######......####",
			"#######.......#######.......#######.....",
		].join("\n"),
	));
