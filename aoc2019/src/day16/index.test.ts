import { expect, test } from "bun:test";
import { message, part1, part2 } from "./index.ts";

test("the transform alternates runs of positive and negative coefficients", () => {
	expect(message("12345678", 1, 0, 4)).toBe("01029498");
	expect(part1("80871224585914546619083218645595")).toBe("24176176");
});
test("repeated signal message", () => {
	expect(part2("03036732577212944063491565474664")).toBe("84462026");
});
