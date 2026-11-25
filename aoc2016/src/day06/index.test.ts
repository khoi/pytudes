import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("recovers the message from column frequencies", () => {
	const sample = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`;
	expect(part1(sample)).toBe("easter");
	expect(part2(sample)).toBe("advent");
});
