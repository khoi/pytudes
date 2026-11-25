import { run } from "../../../scripts/aoc.ts";
import { firstAlignment } from "../../../scripts/congruence.ts";

function parse(input: string) {
	const [instructions, definitions] = input.trim().split(/\r?\n\r?\n/);
	const graph = new Map<string, string[]>();
	for (const line of definitions.split(/\r?\n/)) {
		const [node, left, right] = line.match(/\w+/g)!;
		graph.set(node, [left, right]);
	}
	return { instructions, graph };
}

function orbit(
	network: ReturnType<typeof parse>,
	start: string,
	end: (node: string) => boolean,
) {
	const { instructions, graph } = network;
	const seen = new Map<string, number>();
	const hits = new Set<number>();
	let node = start,
		step = 0;
	while (true) {
		const phase = step % instructions.length;
		const state = node + ":" + phase;
		const previous = seen.get(state);
		if (previous !== undefined) {
			const period = step - previous;
			const residues = [...hits]
				.filter((t) => t >= previous)
				.map((t) => t % period);
			return { hits, cycleStart: previous, period, residues };
		}
		seen.set(state, step);
		if (end(node)) hits.add(step);
		node = graph.get(node)![instructions[phase] === "L" ? 0 : 1];
		step++;
	}
}

export function part1(input: string) {
	const { hits } = orbit(parse(input), "AAA", (node) => node === "ZZZ");
	for (const step of hits) return step;
	throw new Error("ZZZ is unreachable");
}

export function part2(input: string) {
	const network = parse(input);
	const ghosts = [...network.graph.keys()]
		.filter((n) => n.endsWith("A"))
		.map((n) => orbit(network, n, (node) => node.endsWith("Z")));
	const threshold = Math.max(...ghosts.map((g) => g.cycleStart));
	for (let time = 0; time < threshold; time++) {
		if (
			ghosts.every((g) =>
				time < g.cycleStart
					? g.hits.has(time)
					: g.residues.includes(time % g.period),
			)
		) {
			return BigInt(time);
		}
	}

	const schedules = ghosts.map(({ residues, period }) =>
		residues.map((at) => ({ at: BigInt(at), period: BigInt(period) })),
	);
	const alignment = firstAlignment(schedules, BigInt(threshold));
	if (alignment === undefined) throw new Error("Ghosts never finish together");
	return alignment;
}

if (import.meta.main) run(import.meta.url, part1, part2);
