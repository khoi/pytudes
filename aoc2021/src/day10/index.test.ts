import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("corruption and bracket completion", () => {
	const lines = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;
	expect(part1(lines)).toBe(26397);
	expect(part2(lines)).toBe(288957);
});
