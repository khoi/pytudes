import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("vault doors depend on the full path", () => {
	expect(part1("ihgpwlah")).toBe("DDRRRD");
	expect(part1("kglvqrro")).toBe("DDUDRLRRUDRD");
	expect(part2("ihgpwlah")).toBe(370);
	expect(() => part1("hijkl")).toThrow();
});
