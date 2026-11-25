import { run } from "../../../scripts/aoc.ts";
import { firstAlignment, type Schedule } from "../../../scripts/congruence.ts";

type Module = {
	kind: string;
	outputs: string[];
	on: boolean;
	memory: Map<string, boolean>;
};
type Network = Map<string, Module>;
type Pulse = { from: string; to: string; high: boolean; path: string };

function parse(input: string): Network {
	const network: Network = new Map();
	for (const line of input.trim().split(/\r?\n/)) {
		const [source, destinations] = line.split(" -> ");
		const label = source === "broadcaster" ? source : source.slice(1);
		network.set(label, {
			kind: source[0],
			outputs: destinations.split(", "),
			on: false,
			memory: new Map(),
		});
	}
	for (const [source, module] of network)
		for (const dest of module.outputs)
			if (network.get(dest)?.kind === "&")
				network.get(dest)!.memory.set(source, false);
	return network;
}

function press(
	network: Network,
	visit: (pulse: Pulse) => void,
	trackOrder = false,
) {
	const queue: Pulse[] = [
		{ from: "button", to: "broadcaster", high: false, path: "" },
	];
	for (let i = 0; i < queue.length; i++) {
		const pulse = queue[i];
		visit(pulse);
		const module = network.get(pulse.to);
		if (!module) continue;
		let high = pulse.high;
		if (module.kind === "%") {
			if (high) continue;
			high = module.on = !module.on;
		} else if (module.kind === "&") {
			module.memory.set(pulse.from, high);
			high = !Array.from(module.memory.values()).every(Boolean);
		}
		module.outputs.forEach((to, index) =>
			queue.push({
				from: pulse.to,
				to,
				high,
				path: trackOrder ? pulse.path + String.fromCharCode(1 + index) : "",
			}),
		);
	}
}

export function part1(input: string): number {
	const network = parse(input);
	const counts = [0, 0];
	for (let i = 0; i < 1000; i++)
		press(network, (pulse) => counts[Number(pulse.high)]++);
	return counts[0] * counts[1];
}

function state(modules: Module[]): string {
	return modules
		.map((m) =>
			m.kind === "%"
				? Number(m.on)
				: [...m.memory.values()].map(Number).join(""),
		)
		.join("/");
}

function ancestors(network: Network, name: string): Module[] {
	const names = new Set([name]);
	for (const current of names)
		for (const [label, m] of network)
			if (m.outputs.includes(current)) names.add(label);
	return [...names].map((name) => network.get(name)!);
}

type Phase = { startHigh: boolean; pulses: Pulse[] };
type Branch = {
	source: string;
	modules: Module[];
	seen: Map<string, number>;
	phases: Phase[];
	start: number;
	period: number;
};
function pathOrder(a: string, b: string): number {
	return a.length - b.length || (a < b ? -1 : a > b ? 1 : 0);
}

function nextAlignment(branches: Branch[], lowerBound: number): bigint {
	const triggers = new Map<string, string>();
	for (const b of branches)
		for (const phase of b.phases.slice(b.start, b.start + b.period))
			for (const pulse of phase.pulses)
				if (pulse.high) triggers.set(pulse.path, b.source);

	let earliest: bigint | undefined;
	for (const [path, source] of triggers) {
		const options = branches.map((b) => {
			const residues: Schedule[] = [];
			for (let t = b.start; t < b.start + b.period; t++) {
				const phase = b.phases[t];
				let high = phase.startHigh,
					triggered = false;
				for (const pulse of phase.pulses) {
					if (pathOrder(pulse.path, path) > 0) break;
					high = pulse.high;
					if (pulse.path === path) triggered = high;
				}
				if (high && (source !== b.source || triggered))
					residues.push({
						at: BigInt((t + 1) % b.period),
						period: BigInt(b.period),
					});
			}
			return residues;
		});
		const time = firstAlignment(options, BigInt(lowerBound));
		if (time !== undefined && (earliest === undefined || time < earliest))
			earliest = time;
	}
	if (earliest === undefined) throw new Error("rx never receives a low pulse");
	return earliest;
}

export function part2(input: string): bigint {
	const network = parse(input);
	const feeders = [...network].filter(([, m]) => m.outputs.includes("rx"));
	const gate = feeders[0]?.[1];
	if (feeders.length !== 1 || gate.kind !== "&") {
		const modules = [...network.values()],
			seen = new Set<string>();
		for (let count = 1; ; count++) {
			const key = state(modules);
			if (seen.has(key)) throw new Error("rx never receives a low pulse");
			seen.add(key);
			let received = false;
			press(network, (pulse) => {
				if (pulse.to === "rx" && !pulse.high) received = true;
			});
			if (received) return BigInt(count);
		}
	}
	const branches: Branch[] = [...gate.memory.keys()].map((source) => ({
		source,
		modules: ancestors(network, source),
		seen: new Map(),
		phases: [],
		start: 0,
		period: 0,
	}));
	for (let t = 0; ; t++) {
		for (const b of branches) {
			if (b.period) continue;
			const startHigh = gate.memory.get(b.source)!;
			const key = Number(startHigh) + state(b.modules);
			const start = b.seen.get(key);
			if (start !== undefined) {
				b.start = start;
				b.period = t - start;
			} else {
				b.seen.set(key, t);
				b.phases.push({ startHigh, pulses: [] });
			}
		}
		if (branches.every((b) => b.period)) return nextAlignment(branches, t + 1);
		let received = false;
		press(
			network,
			(pulse) => {
				if (pulse.to === "rx" && !pulse.high) received = true;
				if (pulse.to === feeders[0][0]) {
					const branch = branches.find((b) => b.source === pulse.from)!;
					if (!branch.period) branch.phases[t].pulses.push(pulse);
				}
			},
			true,
		);
		if (received) return BigInt(t + 1);
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
