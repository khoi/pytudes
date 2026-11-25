import { run } from "../../../scripts/aoc.ts";

type Point = [number, number, number];

function rotations(points: Point[]) {
	const orientations: Point[][] = [];
	for (let i = 0; i < 3; i++)
		for (let j = 0; j < 3; j++) {
			if (i === j) continue;
			const k = 3 - i - j;
			const parity = j === (i + 1) % 3 ? 1 : -1;
			for (const a of [-1, 1])
				for (const b of [-1, 1]) {
					orientations.push(
						points.map((p) => [a * p[i], b * p[j], parity * a * b * p[k]]),
					);
				}
		}
	return orientations;
}

function distances(points: Point[]) {
	const counts = new Map<number, number>();
	for (let i = 0; i < points.length; i++)
		for (let j = 0; j < i; j++) {
			const distance = points[i].reduce(
				(sum, v, axis) => sum + (v - points[j][axis]) ** 2,
				0,
			);
			counts.set(distance, (counts.get(distance) ?? 0) + 1);
		}
	return counts;
}

function commonPairs(left: Map<number, number>, right: Map<number, number>) {
	let count = 0;
	for (const [distance, n] of left)
		count += Math.min(n, right.get(distance) ?? 0);
	return count;
}

function align(known: Point[], orientations: Point[][]) {
	for (const points of orientations) {
		const offsets = new Map<string, number>();
		for (const [x, y, z] of known)
			for (const [a, b, c] of points) {
				const origin: Point = [x - a, y - b, z - c];
				const key = origin.join(",");
				const n = (offsets.get(key) ?? 0) + 1;
				if (n === 12) {
					return {
						origin,
						points: points.map(
							([x, y, z]): Point => [
								x + origin[0],
								y + origin[1],
								z + origin[2],
							],
						),
					};
				}
				offsets.set(key, n);
			}
	}
}

function scan(input: string) {
	const scanners = input
		.trim()
		.split(/\r?\n\s*\n/)
		.map((block) => {
			const points = block
				.split(/\r?\n/)
				.slice(1)
				.map((line) => line.split(",").map(Number) as Point);
			return {
				points,
				distances: distances(points),
				orientations: rotations(points),
			};
		});
	const queue = [{ index: 0, points: scanners[0].points }];
	const origins: Point[] = [[0, 0, 0]];
	const remaining = new Set(scanners.keys());
	remaining.delete(0);
	for (const current of queue) {
		for (const index of remaining) {
			const scanner = scanners[index];
			if (
				commonPairs(scanners[current.index].distances, scanner.distances) < 66
			)
				continue;
			const found = align(current.points, scanner.orientations);
			if (!found) continue;
			origins.push(found.origin);
			queue.push({ index, points: found.points });
			remaining.delete(index);
		}
	}
	if (remaining.size) throw new Error("Unable to locate every scanner");
	const beacons = new Set(
		queue.flatMap((s) => s.points.map((p) => p.join(","))),
	);
	return { beacons, origins };
}

export function part1(input: string) {
	return scan(input).beacons.size;
}

export function part2(input: string) {
	const { origins } = scan(input);
	let farthest = 0;
	for (const a of origins)
		for (const b of origins) {
			farthest = Math.max(
				farthest,
				a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0),
			);
		}
	return farthest;
}

if (import.meta.main) run(import.meta.url, part1, part2);
