import { run } from "../../../scripts/aoc.ts";

function countPaths(input: string, start: string, required: string[]) {
	const graph = new Map(
		input
			.trim()
			.split("\n")
			.map((line) => {
				const [source, destinations] = line.split(":");
				return [source, destinations.trim().split(/\s+/)];
			}),
	);
	const memo = new Map<string, number>();

	function visit(node: string, missing: number): number {
		if (node === "out") return missing === 0 ? 1 : 0;
		const index = required.indexOf(node);
		if (index !== -1) missing &= ~(1 << index);
		const key = `${node}:${missing}`;
		const known = memo.get(key);
		if (known !== undefined) return known;
		const paths = (graph.get(node) ?? []).reduce(
			(sum, next) => sum + visit(next, missing),
			0,
		);
		memo.set(key, paths);
		return paths;
	}

	return visit(start, (1 << required.length) - 1);
}

export function part1(input: string): number {
	return countPaths(input, "you", []);
}

export function part2(input: string): number {
	return countPaths(input, "svr", ["dac", "fft"]);
}

if (import.meta.main) run(import.meta.url, part1, part2);
