import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

test("part one", () => expect(part1(sample)).toBe(152));
test("part two", () => expect(part2(sample)).toBe(301));
