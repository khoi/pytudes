import { run } from "../../../scripts/aoc.ts";

function pressureBySet(input: string, minutes: number): number[] {
	const graph = new Map<string, { rate: number; tunnels: string[] }>();
	for (const line of input.trim().split(/\r?\n/)) {
		const [, valve, rate, tunnels] = line.match(
			/^Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/,
		)!;
		graph.set(valve, { rate: Number(rate), tunnels: tunnels.split(", ") });
	}
	const valves = [...graph.keys()].filter(
		(valve) => graph.get(valve)!.rate > 0,
	);
	const distances = ["AA", ...valves].map((start) => {
		const steps = new Map([[start, 0]]);
		const queue = [start];
		for (let i = 0; i < queue.length; i++) {
			for (const next of graph.get(queue[i])!.tunnels) {
				if (steps.has(next)) continue;
				steps.set(next, steps.get(queue[i])! + 1);
				queue.push(next);
			}
		}
		return valves.map((valve) => steps.get(valve) ?? Infinity);
	});

	const rates = valves.map((valve) => graph.get(valve)!.rate);
	const best = Array<number>(2 ** valves.length).fill(0);
	const visited = new Map<number, number>();
	function visit(
		position: number,
		time: number,
		opened: number,
		pressure: number,
	) {
		const key =
			(opened * (valves.length + 1) + position) * (minutes + 1) + time;
		if ((visited.get(key) ?? -1) >= pressure) return;
		visited.set(key, pressure);
		best[opened] = Math.max(best[opened], pressure);
		for (let valve = 0; valve < valves.length; valve++) {
			const bit = 1 << valve;
			const remaining = time - distances[position][valve] - 1;
			if (!(opened & bit) && remaining > 0) {
				visit(
					valve + 1,
					remaining,
					opened | bit,
					pressure + remaining * rates[valve],
				);
			}
		}
	}
	visit(0, minutes, 0, 0);
	return best;
}

export function part1(input: string): number {
	return pressureBySet(input, 30).reduce((a, b) => Math.max(a, b), 0);
}

export function part2(input: string): number {
	const best = pressureBySet(input, 26);
	for (let bit = 1; bit < best.length; bit *= 2) {
		for (let mask = bit; mask < best.length; mask++) {
			if (mask & bit) best[mask] = Math.max(best[mask], best[mask ^ bit]);
		}
	}
	const all = best.length - 1;
	return best.reduce(
		(maximum, pressure, set) => Math.max(maximum, pressure + best[all ^ set]),
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
