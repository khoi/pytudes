import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = [
	"$ cd /",
	"$ ls",
	"dir a",
	"14848514 b.txt",
	"8504156 c.dat",
	"dir d",
	"$ cd a",
	"$ ls",
	"dir e",
	"29116 f",
	"2557 g",
	"62596 h.lst",
	"$ cd e",
	"$ ls",
	"584 i",
	"$ cd ..",
	"$ cd ..",
	"$ cd d",
	"$ ls",
	"4060174 j",
	"8033020 d.log",
	"5626152 d.ext",
	"7214296 k",
].join("\n");
test("small directories", () => expect(part1(sample)).toBe(95437));
test("smallest sufficient deletion", () =>
	expect(part2(sample)).toBe(24933642));
