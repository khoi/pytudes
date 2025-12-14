import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function parse(input: string) {
	const graph = new Map<string, string[]>();
	for (const line of input.trim().split("\n")) {
		const [node, rest] = line.split(":");
		const outputs = rest?.trim().split(/\s+/) ?? [];
		graph.set(node.trim(), outputs);
	}
	return graph;
}

export function part1(input: string): number {
	const graph = parse(input);
	const memo = new Map<string, number>();

	function dfs(node: string): number {
		if (node === "out") return 1;
		if (memo.has(node)) return memo.get(node)!;

		const total = (graph.get(node) ?? []).reduce((sum, next) => sum + dfs(next), 0);
		memo.set(node, total);
		return total;
	}

	return dfs("you");
}

export function part2(_input: string): number {
	return 0;
}

if (import.meta.main) {
	console.log("Part 1:", part1(input));
	console.log("Part 2:", part2(input));
}
