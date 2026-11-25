import { run } from "../../../scripts/aoc.ts";

type Gate = { left: string; op: string; right: string; out: string };

function parse(input: string) {
	const [initial, wiring] = input.trim().split(/\r?\n\s*\n/);
	const values = new Map(
		initial.split(/\r?\n/).map((line) => {
			const [wire, value] = line.split(": ");
			return [wire, Number(value)] as const;
		}),
	);
	const gates: Gate[] = wiring.split(/\r?\n/).map((line) => {
		const [left, op, right, , out] = line.split(" ");
		return { left, op, right, out };
	});
	return { values, gates };
}

export function part1(input: string) {
	const { values, gates } = parse(input);
	const drivers = new Map(gates.map((g) => [g.out, g]));
	function value(wire: string): number {
		const known = values.get(wire);
		if (known !== undefined) return known;
		const gate = drivers.get(wire)!;
		const a = value(gate.left);
		const b = value(gate.right);
		const result =
			gate.op === "XOR" ? a ^ b : gate.op === "AND" ? a & b : a | b;
		values.set(wire, result);
		return result;
	}
	let result = 0n;
	for (const wire of drivers.keys()) {
		if (/^z\d+$/.test(wire))
			result |= BigInt(value(wire)) << BigInt(wire.slice(1));
	}
	return result;
}

type Wiring = { labels: Map<string, string>; swaps: number };
type Binding = [string, string];

function bind(
	wiring: Wiring,
	bindings: Binding[],
	limit: number,
): Wiring | undefined {
	const labels = new Map(wiring.labels);
	let swaps = wiring.swaps;
	for (const [source, target] of bindings) {
		const assigned = labels.get(source);
		if (assigned !== undefined) {
			if (assigned !== target) return;
			continue;
		}
		if (labels.has(target)) return;
		if (source !== target && ++swaps > limit) return;
		labels.set(source, target);
		labels.set(target, source);
	}
	return { labels, swaps };
}

export function part2(input: string, maxSwaps = 4) {
	const { values, gates } = parse(input);
	const signature = (op: string, a: string, b: string) =>
		[op, ...[a, b].sort()].join(":");
	const indexed = new Map(
		gates.map((g) => [signature(g.op, g.left, g.right), g]),
	);
	const gate = (op: string, a: string, b: string) =>
		indexed.get(signature(op, a, b));
	const inputs = [...values.keys()].filter((k) => /^x\d+$/.test(k)).sort();
	const z = (bit: number) =>
		"z" + bit.toString().padStart(inputs[0].length - 1, "0");
	const stages = inputs.map((x) => {
		const y = "y" + x.slice(1);
		return {
			propagate: gate("XOR", x, y)!.out,
			generate: gate("AND", x, y)!.out,
		};
	});
	const sums = gates.filter(
		(g) =>
			g.op === "XOR" && !values.has(g.left) && gate("AND", g.left, g.right),
	);
	const carries = gates.filter((g) => g.op === "OR");

	function candidates(
		wiring: Wiring,
		gates: Gate[],
		a: string,
		b: string,
		output?: string,
	) {
		const options: { gate: Gate; wiring: Wiring }[] = [];
		for (const g of gates) {
			for (const [left, right] of [
				[g.left, g.right],
				[g.right, g.left],
			]) {
				const bindings: Binding[] = [
					[a, left],
					[b, right],
				];
				if (output !== undefined) bindings.push([g.out, output]);
				const updated = bind(wiring, bindings, maxSwaps);
				if (updated) options.push({ gate: g, wiring: updated });
			}
		}
		return options.sort((x, y) => x.wiring.swaps - y.wiring.swaps);
	}

	function repair(
		bit: number,
		carry: string,
		wiring: Wiring,
	): Wiring | undefined {
		if (bit === stages.length) return bind(wiring, [[carry, z(bit)]], maxSwaps);
		const { propagate, generate } = stages[bit];
		for (const sum of candidates(wiring, sums, propagate, carry, z(bit))) {
			const overflow = gate("AND", sum.gate.left, sum.gate.right)!.out;
			for (const next of candidates(sum.wiring, carries, generate, overflow)) {
				const fixed = repair(bit + 1, next.gate.out, next.wiring);
				if (fixed) return fixed;
			}
		}
	}
	const first = bind(
		{ labels: new Map(), swaps: 0 },
		[[stages[0].propagate, z(0)]],
		maxSwaps,
	);
	const fixed = first && repair(1, stages[0].generate, first);
	if (!fixed) throw new Error("Cannot repair ripple-carry adder");
	return [...fixed.labels]
		.filter(([a, b]) => a !== b)
		.map(([a]) => a)
		.sort()
		.join(",");
}

if (import.meta.main) run(import.meta.url, part1, part2);
