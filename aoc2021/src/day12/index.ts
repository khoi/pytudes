import { run } from "../../../scripts/aoc.ts";

function paths(input: string, allowDoubleVisit: boolean) {
	const tunnels = new Map<string, string[]>();
	for (const line of input.trim().split(/\s+/)) {
		const [a, b] = line.split("-");
		for (const [from, to] of [
			[a, b],
			[b, a],
		]) {
			if (!tunnels.has(from)) tunnels.set(from, []);
			if (to !== "start" && from !== "end") tunnels.get(from)!.push(to);
		}
	}
	const visits = new Set<string>();
	function visit(cave: string, doubleAvailable: boolean): number {
		if (cave === "end") return 1;
		let count = 0;
		for (const next of tunnels.get(cave)!) {
			if (next !== next.toLowerCase()) count += visit(next, doubleAvailable);
			else if (!visits.has(next)) {
				visits.add(next);
				count += visit(next, doubleAvailable);
				visits.delete(next);
			} else if (doubleAvailable) count += visit(next, false);
		}
		return count;
	}
	return visit("start", allowDoubleVisit);
}

export const part1 = (input: string) => paths(input, false);
export const part2 = (input: string) => paths(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
