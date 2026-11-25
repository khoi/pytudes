import { run } from "../../../scripts/aoc.ts";

function junctions(input: string) {
	const points = input
		.trim()
		.split(/\r?\n/)
		.map((row) => row.split(",").map(Number));
	const edges: { distance: number; a: number; b: number }[] = [];
	for (let a = 0; a < points.length; a++) {
		const [x, y, z] = points[a];
		for (let b = a + 1; b < points.length; b++) {
			const [xx, yy, zz] = points[b];
			const distance = (x - xx) ** 2 + (y - yy) ** 2 + (z - zz) ** 2;
			edges.push({ distance, a, b });
		}
	}
	edges.sort((a, b) => a.distance - b.distance);
	return { points, edges };
}

class Circuits {
	readonly parent: number[];
	readonly sizes: number[];
	count: number;

	constructor(boxes: number) {
		this.parent = Array.from({ length: boxes }, (_, i) => i);
		this.sizes = Array(boxes).fill(1);
		this.count = boxes;
	}

	private find(i: number): number {
		while (this.parent[i] !== i) {
			this.parent[i] = this.parent[this.parent[i]];
			i = this.parent[i];
		}
		return i;
	}

	connect(a: number, b: number): void {
		let first = this.find(a);
		let second = this.find(b);
		if (first === second) return;
		if (this.sizes[first] < this.sizes[second])
			[first, second] = [second, first];
		this.parent[second] = first;
		this.sizes[first] += this.sizes[second];
		this.sizes[second] = 0;
		this.count--;
	}
}

export function part1(input: string, connections = 1000): number {
	const { points, edges } = junctions(input);
	const circuits = new Circuits(points.length);
	for (const { a, b } of edges.slice(0, connections)) circuits.connect(a, b);
	const largest = circuits.sizes
		.filter(Boolean)
		.sort((a, b) => b - a)
		.slice(0, 3);
	return largest.reduce((product, size) => product * size, 1);
}

export function part2(input: string): number {
	const { points, edges } = junctions(input);
	const circuits = new Circuits(points.length);
	for (const { a, b } of edges) {
		circuits.connect(a, b);
		if (circuits.count === 1) return points[a][0] * points[b][0];
	}
	throw new Error("Expected at least two junction boxes");
}

if (import.meta.main) run(import.meta.url, part1, part2);
