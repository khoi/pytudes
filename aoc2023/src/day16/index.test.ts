import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = [
	".|...\\....",
	"|.-.\\.....",
	".....|-...",
	"........|.",
	"..........",
	".........\\",
	"..../.\\\\..",
	".-.-/..|..",
	".|....-|.\\",
	"..//.|....",
].join("\n");

test("mirrored and split beams", () => {
	expect(part1(sample)).toBe(46);
	expect(part2(sample)).toBe(51);
});
