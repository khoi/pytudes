import { expect, test } from "bun:test";
import { springScript } from "./index.ts";

test("the droid only jumps when it can land and continue", () => {
	for (const mode of ["WALK", "RUN"] as const) {
		for (let ground = 0; ground < 512; ground++) {
			const registers: Record<string, boolean> = { T: false, J: false };
			for (const [i, sensor] of Array.from("ABCDEFGHI").entries())
				registers[sensor] = Boolean(ground & (1 << i));
			for (const line of springScript(mode).trim().split("\n").slice(0, -1)) {
				const [op, from, to] = line.split(" ");
				if (op === "NOT") registers[to] = !registers[from];
				else if (op === "AND") registers[to] &&= registers[from];
				else if (op === "OR") registers[to] ||= registers[from];
			}
			const { A, B, C, D, E, H } = registers;
			expect(registers.J).toBe(
				(!A || !B || !C) && D && (mode === "WALK" || E || H),
			);
		}
	}
});
