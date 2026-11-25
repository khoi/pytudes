import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const vertices = new Map<string, number>();
	const adjacent: Map<number, number>[] = [];
	function vertex(name: string) {
		let id = vertices.get(name);
		if (id === undefined) {
			id = vertices.size;
			vertices.set(name, id);
			adjacent.push(new Map());
		}
		return id;
	}
	for (const line of input.trim().split(/\r?\n/)) {
		const [name, links] = line.split(": ");
		const a = vertex(name);
		for (const other of links.split(/\s+/)) {
			const b = vertex(other);
			adjacent[a].set(b, 1);
			adjacent[b].set(a, 1);
		}
	}
	for (let sink = 1; sink < vertices.size; sink++) {
		const residual = adjacent.map((edges) => new Map(edges));
		for (let flow = 0; flow <= 3; flow++) {
			const previous = new Int32Array(vertices.size).fill(-1);
			const queue = [0];
			previous[0] = 0;
			for (let i = 0; i < queue.length && previous[sink] === -1; i++) {
				const from = queue[i];
				for (const [to, capacity] of residual[from]) {
					if (!capacity || previous[to] !== -1) continue;
					previous[to] = from;
					queue.push(to);
				}
			}
			if (previous[sink] === -1) {
				if (flow === 3) return queue.length * (vertices.size - queue.length);
				break;
			}
			for (let to = sink; to !== 0; to = previous[to]) {
				const from = previous[to];
				residual[from].set(to, residual[from].get(to)! - 1);
				residual[to].set(from, residual[to].get(from)! + 1);
			}
		}
	}
	throw new Error("No three-wire cut found");
}

if (import.meta.main) run(import.meta.url, part1);
