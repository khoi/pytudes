import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("follows all alternatives, including empty branches", () => {
	expect(part1("^WNE$")).toBe(3);
	expect(part1("^ENWWW(NEEE|SSE(EE|N))$")).toBe(10);
	expect(part1("^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$")).toBe(18);
	expect(part1("^N(EE|WW)N$")).toBe(4);
});

test("counts rooms exactly a thousand doors away", () => {
	expect(part2("^" + "E".repeat(1000) + "$")).toBe(1);
});
