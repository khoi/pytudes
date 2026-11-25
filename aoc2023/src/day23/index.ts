import { run } from "../../../scripts/aoc.ts";

function longestHike(input: string, slopes: boolean): number {
	const grid = input.trim().split(/\r?\n/),
		w = grid[0].length,
		h = grid.length;
	const start = grid[0].indexOf("."),
		end = (h - 1) * w + grid[h - 1].indexOf(".");
	const neighbors: number[][] = Array.from({ length: w * h }, () => []);
	const deltas = [1, w, -1, -w];
	for (let y = 0; y < h; y++)
		for (let x = 0; x < w; x++) {
			if (grid[y][x] === "#") continue;
			const cell = y * w + x;
			for (const [dx, dy] of [
				[1, 0],
				[0, 1],
				[-1, 0],
				[0, -1],
			]) {
				const tile = grid[y + dy]?.[x + dx];
				if (tile && tile !== "#") neighbors[cell].push(cell + dy * w + dx);
			}
		}
	const junctions = neighbors.map(
		(next, i) =>
			next.length > 0 && (i === start || i === end || next.length !== 2),
	);
	const graph = new Map<number, { to: number; length: number }[]>();
	for (const [cell, isJunction] of junctions.entries()) {
		if (!isJunction) continue;
		const edges: { to: number; length: number }[] = [];
		graph.set(cell, edges);
		for (const first of neighbors[cell]) {
			let previous = cell,
				next = first,
				length = 1;
			while (true) {
				const slope = ">v<^".indexOf(
					grid[Math.floor(previous / w)][previous % w],
				);
				if (slopes && slope >= 0 && next - previous !== deltas[slope]) break;
				if (junctions[next]) {
					edges.push({ to: next, length });
					break;
				}
				const following =
					neighbors[next][0] === previous
						? neighbors[next][1]
						: neighbors[next][0];
				previous = next;
				next = following;
				length++;
			}
		}
	}
	const visited = new Uint8Array(w * h);
	function longest(cell: number): number {
		if (cell === end) return 0;
		visited[cell] = 1;
		let best = -Infinity;
		for (const { to, length } of graph.get(cell)!)
			if (!visited[to]) best = Math.max(best, length + longest(to));
		visited[cell] = 0;
		return best;
	}
	return longest(start);
}

export const part1 = (input: string) => longestHike(input, true);
export const part2 = (input: string) => longestHike(input, false);
if (import.meta.main) run(import.meta.url, part1, part2);
