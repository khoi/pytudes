import { run } from "../../../scripts/aoc.ts";

function shortest(input: string, split: boolean) {
	const grid = input
		.trim()
		.split(/\r?\n/)
		.map((row) => [...row]);
	const width = grid[0].length;
	const initialY = grid.findIndex((row) => row.includes("@"));
	if (split && grid.flat().filter((tile) => tile === "@").length === 1) {
		const x = grid[initialY].indexOf("@");
		for (const dy of [-1, 0, 1]) {
			for (const dx of [-1, 0, 1])
				grid[initialY + dy][x + dx] = dx && dy ? "@" : "#";
		}
	}
	const tiles = grid.flat();
	const positions: number[] = [];
	const entrances: number[] = [];
	const keyBit = (letter: string) =>
		1 << (letter.toLowerCase().charCodeAt(0) - 97);
	let allKeys = 0;
	for (const [index, tile] of tiles.entries()) {
		if (tile === "." || tile === "#") continue;
		if (tile === "@") entrances.push(positions.length);
		if (/[a-z]/.test(tile)) allKeys |= keyBit(tile);
		positions.push(index);
	}

	const nodeAt = new Map(positions.map((position, i) => [position, i]));
	const graph = positions.map((start) => {
		const edges: { to: number; distance: number }[] = [];
		const seen = new Set([start]);
		const queue = [{ position: start, distance: 0 }];
		for (let i = 0; i < queue.length; i++) {
			const { position, distance } = queue[i];
			for (const next of [
				position - width,
				position + width,
				position - 1,
				position + 1,
			]) {
				if (seen.has(next) || !tiles[next] || tiles[next] === "#") continue;
				seen.add(next);
				const to = nodeAt.get(next);
				if (to === undefined)
					queue.push({ position: next, distance: distance + 1 });
				else edges.push({ to, distance: distance + 1 });
			}
		}
		return edges;
	});

	interface Key {
		to: number;
		distance: number;
		bit: number;
	}
	const reachable = new Map<number, Key[]>();
	function nextKeys(start: number, keys: number) {
		const state = keys * positions.length + start;
		const cached = reachable.get(state);
		if (cached) return cached;
		const distances = new Float64Array(positions.length).fill(Infinity);
		distances[start] = 0;
		const queue = [start];
		const found = new Set<number>();
		for (let i = 0; i < queue.length; i++) {
			const node = queue[i];
			for (const { to, distance } of graph[node]) {
				const length = distance + distances[node];
				if (length >= distances[to]) continue;
				const tile = tiles[positions[to]];
				const locked = tile !== "@" && !(keyBit(tile) & keys);
				if (locked && tile === tile.toUpperCase()) continue;
				distances[to] = length;
				if (locked) found.add(to);
				else queue.push(to);
			}
		}
		const choices = [...found].map((to) => ({
			to,
			distance: distances[to],
			bit: keyBit(tiles[positions[to]]),
		}));
		reachable.set(state, choices);
		return choices;
	}

	const best = new Map<string, number>();
	function collect(robots: number[], keys: number): number {
		if (keys === allKeys) return 0;
		const state = [keys, ...robots].join(",");
		const known = best.get(state);
		if (known !== undefined) return known;
		let result = Infinity;
		for (const [robot, start] of robots.entries()) {
			for (const { to, distance, bit } of nextKeys(start, keys)) {
				const next = [...robots];
				next[robot] = to;
				result = Math.min(result, distance + collect(next, keys | bit));
			}
		}
		best.set(state, result);
		return result;
	}
	const length = collect(entrances, 0);
	if (!Number.isFinite(length)) throw new Error("No route collects all keys");
	return length;
}

export function part1(input: string) {
	return shortest(input, false);
}
export function part2(input: string) {
	return shortest(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
