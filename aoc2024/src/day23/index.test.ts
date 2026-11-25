import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`;

test("finds triangles with a t-computer and the largest clique", () => {
	expect(part1(sample)).toBe(7);
	expect(part2(sample)).toBe("co,de,ka,ta");
});
