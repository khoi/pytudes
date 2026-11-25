import { run } from "../../../scripts/aoc.ts";

function winningScores(input: string) {
	const [drawList, ...boards] = input.trim().split(/\r?\n\s*\r?\n/);
	const draws = drawList.split(",").map(Number);
	const calledAt = new Map<number, number>();
	draws.forEach((n, turn) => {
		if (!calledAt.has(n)) calledAt.set(n, turn);
	});
	const when = (value: number) => calledAt.get(value) ?? Infinity;
	const winners = boards
		.map((board) => {
			const rows = board
				.trim()
				.split(/\r?\n/)
				.map((row) => row.trim().split(/\s+/).map(Number));
			const columns = rows[0].map((_, i) => rows.map((row) => row[i]));
			const turn = Math.min(
				...[...rows, ...columns].map((line) => Math.max(...line.map(when))),
			);
			const unmarked = rows
				.flat()
				.filter((n) => when(n) > turn)
				.reduce((sum, n) => sum + n, 0);
			return { turn, unmarked };
		})
		.filter((board) => Number.isFinite(board.turn))
		.sort((a, b) => a.turn - b.turn);
	return winners.map(({ turn, unmarked }) => draws[turn] * unmarked);
}

export const part1 = (input: string) => winningScores(input)[0];
export const part2 = (input: string) => winningScores(input).at(-1)!;

if (import.meta.main) run(import.meta.url, part1, part2);
