import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("workers start all available steps at each completion", () => {
	const sample = ["CA", "CF", "AB", "AD", "BE", "DE", "FE"]
		.map(
			([before, after]) =>
				`Step ${before} must be finished before step ${after} can begin.`,
		)
		.join("\n");
	expect(part1(sample)).toBe("CABDFE");
	expect(part2(sample, 2, 0)).toBe(15);
});
