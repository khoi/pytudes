import { run } from "../../../scripts/aoc.ts";

function network(input: string) {
	const neighbors = new Map<string, Set<string>>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [a, b] = line.split("-");
		for (const [from, to] of [
			[a, b],
			[b, a],
		]) {
			if (!neighbors.has(from)) neighbors.set(from, new Set());
			neighbors.get(from)!.add(to);
		}
	}
	return neighbors;
}

export function part1(input: string) {
	const graph = network(input);
	let count = 0;
	for (const [a, neighbors] of graph) {
		for (const b of neighbors) {
			if (b <= a) continue;
			for (const c of graph.get(b)!) {
				if (
					c > b &&
					neighbors.has(c) &&
					[a, b, c].some((n) => n.startsWith("t"))
				)
					count++;
			}
		}
	}
	return count;
}

export function part2(input: string) {
	const graph = network(input);
	let best: string[] = [];
	function extend(clique: string[], candidates: string[]) {
		if (clique.length > best.length) best = clique;
		for (let i = 0; i < candidates.length; i++) {
			if (clique.length + candidates.length - i <= best.length) break;
			const member = candidates[i];
			const connected = graph.get(member)!;
			extend(
				[...clique, member],
				candidates.slice(i + 1).filter((n) => connected.has(n)),
			);
		}
	}
	extend([], [...graph.keys()].sort());
	return best.join(",");
}

if (import.meta.main) run(import.meta.url, part1, part2);
