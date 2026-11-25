import { run } from "../../../scripts/aoc.ts";

type Point = { x: number; y: number };

function asteroids(input: string): Point[] {
	const points: Point[] = [];
	for (const [y, line] of input.trim().split(/\r?\n/).entries()) {
		for (const [x, cell] of [...line].entries()) {
			if (cell === "#" || cell === "X") points.push({ x, y });
		}
	}
	return points;
}

function rays(station: Point, points: Point[]) {
	const directions = new Map<string, { angle: number; points: Point[] }>();
	for (const point of points) {
		const dx = point.x - station.x,
			dy = point.y - station.y;
		if (dx === 0 && dy === 0) continue;
		let a = Math.abs(dx),
			b = Math.abs(dy);
		while (b) [a, b] = [b, a % b];
		const key = `${dx / a},${dy / a}`;
		if (!directions.has(key)) {
			const angle = (Math.atan2(dx, -dy) + Math.PI * 2) % (Math.PI * 2);
			directions.set(key, { angle, points: [] });
		}
		directions.get(key)!.points.push(point);
	}
	return directions;
}

function bestStation(input: string) {
	const points = asteroids(input);
	let count = -1,
		station = points[0];
	for (const point of points) {
		const visible = rays(point, points).size;
		if (visible > count) {
			count = visible;
			station = point;
		}
	}
	return { station, points, count };
}

export const part1 = (input: string) => bestStation(input).count;

export function part2(input: string, target = 200): number {
	const { points, station } = bestStation(input);
	const directions = Array.from(rays(station, points).values()).sort(
		(a, b) => a.angle - b.angle,
	);
	const distance = (p: Point) =>
		Math.abs(p.x - station.x) + Math.abs(p.y - station.y);
	for (const ray of directions)
		ray.points.sort((a, b) => distance(b) - distance(a));
	let removed = 0;
	while (removed < points.length - 1) {
		for (const ray of directions) {
			const point = ray.points.pop();
			if (point && ++removed === target) return 100 * point.x + point.y;
		}
	}
	throw new Error("Too few asteroids for the requested target");
}

if (import.meta.main) run(import.meta.url, part1, part2);
