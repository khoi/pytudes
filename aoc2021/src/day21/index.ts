import { run } from "../../../scripts/aoc.ts";

function starts(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => Number(line.match(/\d+$/)![0]));
}

function move(position: number, roll: number) {
	return ((position + roll - 1) % 10) + 1;
}

export function part1(input: string) {
	const positions = starts(input);
	const scores = [0, 0];
	let rolls = 0;
	let player = 0;
	while (scores[0] < 1000 && scores[1] < 1000) {
		let sum = 0;
		for (let i = 0; i < 3; i++) sum += (rolls++ % 100) + 1;
		positions[player] = move(positions[player], sum);
		scores[player] += positions[player];
		player = 1 - player;
	}
	return scores[player] * rolls;
}

export function part2(input: string) {
	const [a, b] = starts(input);
	const distribution = [1, 3, 6, 7, 6, 3, 1];
	const cache = new Map<number, [number, number]>();
	function wins(
		a: number,
		b: number,
		sa: number,
		sb: number,
	): [number, number] {
		if (sb >= 21) return [0, 1];
		const key = ((sa * 21 + sb) * 10 + a - 1) * 10 + b - 1;
		const cached = cache.get(key);
		if (cached) return cached;
		const result: [number, number] = [0, 0];
		for (const [i, frequency] of distribution.entries()) {
			const next = move(a, i + 3);
			const [second, first] = wins(b, next, sb, sa + next);
			result[0] += first * frequency;
			result[1] += second * frequency;
		}
		cache.set(key, result);
		return result;
	}
	return Math.max(...wins(a, b, 0, 0));
}

if (import.meta.main) run(import.meta.url, part1, part2);
