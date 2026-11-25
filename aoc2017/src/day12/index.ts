import { run } from "../../../scripts/aoc.ts";

function pipes(input: string): Map<number, number[]> {
	const graph = new Map<number, number[]>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [source, destinations] = line.split(" <-> ");
		graph.set(Number(source), destinations.split(", ").map(Number));
	}
	return graph;
}

function visit(
	graph: Map<number, number[]>,
	start: number,
	visited: Set<number>,
): void {
	const stack = [start];
	visited.add(start);
	while (stack.length) {
		for (const next of graph.get(stack.pop()!)!) {
			if (visited.has(next)) continue;
			visited.add(next);
			stack.push(next);
		}
	}
}

export function part1(input: string): number {
	const visited = new Set<number>();
	visit(pipes(input), 0, visited);
	return visited.size;
}

export function part2(input: string): number {
	const graph = pipes(input);
	const visited = new Set<number>();
	let groups = 0;
	for (const node of graph.keys()) {
		if (visited.has(node)) continue;
		visit(graph, node, visited);
		groups++;
	}
	return groups;
}

if (import.meta.main) run(import.meta.url, part1, part2);
