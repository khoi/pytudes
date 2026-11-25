import { run } from "../../../scripts/aoc.ts";

type Node = { x: number; y: number; size: number; used: number };

function nodes(input: string): Node[] {
	return [...input.matchAll(/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T/g)].map(
		([, x, y, size, used]) => ({
			x: Number(x),
			y: Number(y),
			size: Number(size),
			used: Number(used),
		}),
	);
}

export function part1(input: string) {
	const grid = nodes(input);
	let pairs = 0;
	for (const a of grid) {
		for (const b of grid) {
			if (a !== b && a.used > 0 && a.used <= b.size - b.used) pairs++;
		}
	}
	return pairs;
}

function shortest<State>(
	start: State,
	key: (state: State) => string | number,
	finished: (state: State) => boolean,
	moves: (state: State) => Iterable<State>,
) {
	let frontier = [start];
	const visited = new Set([key(start)]);
	for (let steps = 0; frontier.length; steps++) {
		const next: State[] = [];
		for (const state of frontier) {
			if (finished(state)) return steps;
			for (const neighbor of moves(state)) {
				const id = key(neighbor);
				if (visited.has(id)) continue;
				visited.add(id);
				next.push(neighbor);
			}
		}
		frontier = next;
	}
	throw new Error("Goal data cannot reach the destination");
}

function slidingRegion(grid: Node[], edges: number[][], empty: number) {
	if (empty < 0 || grid.filter((node) => node.used === 0).length !== 1) return;
	const mobile = grid.map((node) => node.used <= grid[empty].size);
	const members = grid.filter((_, i) => mobile[i]);
	const payloads = members
		.map((node) => node.used)
		.filter(Boolean)
		.sort((a, b) => a - b);
	const capacities = members.map((node) => node.size);
	if (payloads.at(-1)! > Math.min(...capacities)) return;
	if (
		payloads.length >= 2 &&
		payloads[0] + payloads[1] <= Math.max(...capacities)
	)
		return;
	for (const [i, wall] of grid.entries()) {
		if (mobile[i]) continue;
		for (const j of edges[i]) {
			const neighbor = grid[j];
			if (mobile[j]) {
				if (wall.used <= neighbor.size || payloads[0] <= wall.size - wall.used)
					return;
			} else if (wall.used <= neighbor.size - neighbor.used) {
				return;
			}
		}
	}
	return mobile;
}

export function part2(input: string) {
	const grid = nodes(input);
	const byPosition = new Map(grid.map(({ x, y }, i) => [`${x},${y}`, i]));
	const edges = grid.map(({ x, y }) =>
		[
			[x - 1, y],
			[x + 1, y],
			[x, y - 1],
			[x, y + 1],
		]
			.map(([nx, ny]) => byPosition.get(`${nx},${ny}`))
			.filter((i) => i !== undefined),
	);
	const target = byPosition.get("0,0")!;
	const goal = grid.reduce(
		(best, node, i) => (node.y === 0 && node.x > grid[best].x ? i : best),
		target,
	);
	if (goal === target) return 0;
	const empty = grid.findIndex((node) => node.used === 0);
	const mobile = slidingRegion(grid, edges, empty);
	if (mobile) {
		if (!mobile[goal] || !mobile[target])
			throw new Error("An immovable node blocks the goal");
		const count = grid.length;
		return shortest(
			goal * count + empty,
			(id) => id,
			(id) => Math.floor(id / count) === target,
			function* (id) {
				const hole = id % count;
				const data = Math.floor(id / count);
				for (const source of edges[hole]) {
					if (mobile[source])
						yield (source === data ? hole : data) * count + source;
				}
			},
		);
	}
	return shortest(
		{ goal, sizes: grid.map((node) => node.used) },
		(state) => state.goal + ":" + state.sizes.join(","),
		(state) => state.goal === target,
		function* ({ goal, sizes }) {
			for (const [source, used] of sizes.entries()) {
				if (!used) continue;
				for (const dest of edges[source]) {
					if (used > grid[dest].size - sizes[dest]) continue;
					const next = [...sizes];
					next[dest] += used;
					next[source] = 0;
					yield { goal: goal === source ? dest : goal, sizes: next };
				}
			}
		},
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
