import { run } from "../../../scripts/aoc.ts";

function reflection(lines: string[], smudges: number) {
	for (let axis = 1; axis < lines.length; axis++) {
		let errors = 0;
		for (
			let a = axis - 1, b = axis;
			a >= 0 && b < lines.length && errors <= smudges;
			a--, b++
		) {
			for (let i = 0; i < lines[a].length; i++)
				errors += Number(lines[a][i] !== lines[b][i]);
		}
		if (errors === smudges) return axis;
	}
	return 0;
}

function summarize(input: string, smudges: number) {
	let total = 0;
	for (const pattern of input.trim().split(/\r?\n\r?\n/)) {
		const rows = pattern.split(/\r?\n/);
		const columns = Array.from(rows[0], (_, x) =>
			rows.map((row) => row[x]).join(""),
		);
		total += reflection(columns, smudges) + 100 * reflection(rows, smudges);
	}
	return total;
}

export const part1 = (input: string) => summarize(input, 0);
export const part2 = (input: string) => summarize(input, 1);

if (import.meta.main) run(import.meta.url, part1, part2);
