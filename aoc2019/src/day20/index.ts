import { run } from "../../../scripts/aoc.ts";

function shortest(input: string, recursive: boolean) {
	const rows = input
		.replaceAll("\r", "")
		.replace(/^\n+|\n+$/g, "")
		.split("\n");
	const width = Math.max(...rows.map((row) => row.length)) + 2;
	const blank = " ".repeat(width);
	const tiles = [
		blank,
		...rows.map((row) => (" " + row).padEnd(width)),
		blank,
	].join("");
	const area = tiles.length;
	const directions = [-width, width, -1, 1];
	const exterior = new Set([0]);
	const flood = [0];
	for (let i = 0; i < flood.length; i++) {
		for (const delta of directions) {
			const next = flood[i] + delta;
			if (tiles[next] === " " && !exterior.has(next)) {
				exterior.add(next);
				flood.push(next);
			}
		}
	}
	const portals = new Map<string, number[]>();
	const outer = new Set<number>();
	for (let pos = 0; pos < area; pos++) {
		if (tiles[pos] !== ".") continue;
		for (const delta of directions) {
			const first = tiles[pos + delta];
			const second = tiles[pos + 2 * delta];
			if (!first || !second || !/^[A-Z]{2}$/.test(first + second)) continue;
			const label = delta > 0 ? first + second : second + first;
			const entrances = portals.get(label) ?? [];
			entrances.push(pos);
			portals.set(label, entrances);
			if (exterior.has(pos + 3 * delta)) outer.add(pos);
		}
	}
	const [start] = portals.get("AA")!;
	const [exit] = portals.get("ZZ")!;
	const links = new Map<number, number>();
	for (const entrances of portals.values()) {
		if (entrances.length !== 2) continue;
		const [a, b] = entrances;
		links.set(a, b);
		links.set(b, a);
	}

	const seen = new Set([start]);
	let frontier = [start];
	for (let distance = 0; frontier.length; distance++) {
		const next: number[] = [];
		function enqueue(pos: number, level: number) {
			const state = level * area + pos;
			if (seen.has(state)) return;
			seen.add(state);
			next.push(state);
		}
		for (const state of frontier) {
			const pos = state % area;
			const level = Math.floor(state / area);
			if (pos === exit && level === 0) return distance;
			for (const delta of directions) {
				const to = pos + delta;
				if (tiles[to] === "." && (level === 0 || (to !== start && to !== exit)))
					enqueue(to, level);
			}
			const warp = links.get(pos);
			if (warp !== undefined) {
				const destinationLevel =
					level + (recursive ? (outer.has(pos) ? -1 : 1) : 0);
				if (destinationLevel >= 0) enqueue(warp, destinationLevel);
			}
		}
		frontier = next;
	}
	throw new Error("Maze exit is unreachable");
}

export function part1(input: string) {
	return shortest(input, false);
}
export function part2(input: string) {
	return shortest(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
