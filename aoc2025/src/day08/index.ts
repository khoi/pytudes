import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

type Point3D = [number, number, number];

function parseInput(input: string): Point3D[] {
	return input
		.trim()
		.split("\n")
		.map((line) => line.split(",").map(Number) as Point3D);
}

function distance(p1: Point3D, p2: Point3D): number {
	return Math.sqrt(
		(p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2,
	);
}

class UnionFind {
	parent: number[];
	size: number[];

	constructor(n: number) {
		this.parent = Array.from({ length: n }, (_, i) => i);
		this.size = Array(n).fill(1);
	}

	find(x: number): number {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]);
		}
		return this.parent[x];
	}

	union(x: number, y: number): boolean {
		const rootX = this.find(x);
		const rootY = this.find(y);

		if (rootX === rootY) return false;

		if (this.size[rootX] < this.size[rootY]) {
			this.parent[rootX] = rootY;
			this.size[rootY] += this.size[rootX];
		} else {
			this.parent[rootY] = rootX;
			this.size[rootX] += this.size[rootY];
		}

		return true;
	}

	getCircuitSizes(): number[] {
		const sizes = new Map<number, number>();
		for (let i = 0; i < this.parent.length; i++) {
			const root = this.find(i);
			sizes.set(root, this.size[root]);
		}
		return Array.from(sizes.values());
	}
}

export function part1(input: string): number {
	const points = parseInput(input);
	const n = points.length;

	const edges: { dist: number; i: number; j: number }[] = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			edges.push({ dist: distance(points[i], points[j]), i, j });
		}
	}

	edges.sort((a, b) => a.dist - b.dist);

	const uf = new UnionFind(n);
	for (let k = 0; k < 1000; k++) {
		uf.union(edges[k].i, edges[k].j);
	}

	const sizes = uf.getCircuitSizes().sort((a, b) => b - a);
	return sizes[0] * sizes[1] * sizes[2];
}

export function part2(input: string): number {
	const points = parseInput(input);
	const n = points.length;

	const edges: { dist: number; i: number; j: number }[] = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			edges.push({ dist: distance(points[i], points[j]), i, j });
		}
	}

	edges.sort((a, b) => a.dist - b.dist);

	const uf = new UnionFind(n);
	let lastI = -1;
	let lastJ = -1;

	for (const edge of edges) {
		if (uf.union(edge.i, edge.j)) {
			lastI = edge.i;
			lastJ = edge.j;
			if (uf.getCircuitSizes().length === 1) break;
		}
	}

	return points[lastI][0] * points[lastJ][0];
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
