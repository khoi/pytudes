import { run } from "../../../scripts/aoc.ts";

const moves = [
	["U", 0, -1],
	["D", 0, 1],
	["L", -1, 0],
	["R", 1, 0],
] as const;

function* routes(input: string) {
	const passcode = input.trim();
	type State = { x: number; y: number; path: string };
	let frontier: State[] = [{ x: 0, y: 0, path: "" }];
	while (frontier.length) {
		const next: State[] = [];
		for (const { x, y, path } of frontier) {
			if (x === 3 && y === 3) {
				yield path;
				continue;
			}
			const doors = Bun.MD5.hash(passcode + path, "hex");
			for (const [i, [direction, dx, dy]] of moves.entries()) {
				const nx = x + dx;
				const ny = y + dy;
				if (doors[i] >= "b" && nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
					next.push({ x: nx, y: ny, path: path + direction });
				}
			}
		}
		frontier = next;
	}
}

export function part1(input: string) {
	const shortest = routes(input).next();
	if (shortest.done) throw new Error("No path to the vault");
	return shortest.value;
}

export function part2(input: string) {
	let longest = 0;
	for (const path of routes(input)) longest = path.length;
	return longest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
