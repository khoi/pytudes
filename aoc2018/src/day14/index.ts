import { run } from "../../../scripts/aoc.ts";

function scoreboard() {
	let scores = new Uint8Array(32);
	scores[0] = 3;
	scores[1] = 7;
	let length = 2;
	let first = 0;
	let second = 1;
	return {
		get scores() {
			return scores;
		},
		get length() {
			return length;
		},
		step() {
			if (length + 2 > scores.length) {
				const larger = new Uint8Array(scores.length * 2);
				larger.set(scores);
				scores = larger;
			}
			const sum = scores[first] + scores[second];
			if (sum >= 10) scores[length++] = 1;
			scores[length++] = sum % 10;
			first = (first + 1 + scores[first]) % length;
			second = (second + 1 + scores[second]) % length;
		},
	};
}

export function part1(input: string): string {
	const offset = Number(input.trim());
	const board = scoreboard();
	while (board.length < offset + 10) board.step();
	return board.scores.slice(offset, offset + 10).join("");
}

export function part2(input: string): number {
	const target = Array.from(input.trim(), Number);
	const board = scoreboard();
	for (let start = 0; ; start++) {
		while (start + target.length > board.length) board.step();
		let i = 0;
		while (i < target.length && board.scores[start + i] === target[i]) i++;
		if (i === target.length) return start;
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
