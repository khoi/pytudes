import { run } from "../../../scripts/aoc.ts";

function patrol(input: string) {
	const rows = input.trim().split(/\r?\n/);
	const stride = rows[0].length + 2;
	const border = " ".repeat(stride);
	const map = border + rows.map((row) => " " + row + " ").join("") + border;
	const start = map.indexOf("^");
	const steps = [-stride, 1, stride, -1];
	const seen = new Uint32Array(map.length * 4);
	let attempt = 0;

	function loops(obstacle: number, visited?: Set<number>): boolean {
		attempt++;
		let position = start;
		let facing = 0;
		while (map[position] !== " ") {
			const state = position * 4 + facing;
			if (seen[state] === attempt) return true;
			seen[state] = attempt;
			visited?.add(position);
			const next = position + steps[facing];
			if (map[next] === "#" || next === obstacle) facing = (facing + 1) % 4;
			else position = next;
		}
		return false;
	}

	const visited = new Set<number>();
	loops(-1, visited);
	return { visited, start, loops };
}

export function part1(input: string): number {
	return patrol(input).visited.size;
}

export function part2(input: string): number {
	const { visited, start, loops } = patrol(input);
	let count = 0;
	for (const position of visited) {
		if (position !== start && loops(position)) count++;
	}
	return count;
}

if (import.meta.main) run(import.meta.url, part1, part2);
