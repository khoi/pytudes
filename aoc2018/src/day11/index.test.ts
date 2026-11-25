import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the highest power square for both serial numbers", () => {
	expect(part1("18")).toBe("33,45");
	expect(part2("18")).toBe("90,269,16");
	expect(part1("42")).toBe("21,61");
	expect(part2("42")).toBe("232,251,12");
});
