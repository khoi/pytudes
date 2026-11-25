import { run } from "../../../scripts/aoc.ts";

type Quadratic = [a: bigint, b: bigint, c: bigint];
type Particle = Quadratic[];

function parse(input: string): Particle[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const values = line.match(/-?\d+/g)!.map(BigInt);
			return [0, 1, 2].map((i) => {
				const [position, velocity, acceleration] = [
					values[i],
					values[i + 3],
					values[i + 6],
				];
				return [acceleration, acceleration + 2n * velocity, 2n * position];
			});
		});
}

function distanceCoefficients(particle: Particle): Quadratic {
	const total: Quadratic = [0n, 0n, 0n];
	for (const axis of particle) {
		const leading = axis.find((coefficient) => coefficient !== 0n) ?? 0n;
		const sign = leading < 0n ? -1n : 1n;
		for (let i = 0; i < 3; i++) total[i] += sign * axis[i];
	}
	return total;
}

export function part1(input: string): number {
	const distances = parse(input).map(distanceCoefficients);
	let closest = 0;
	for (let i = 1; i < distances.length; i++) {
		const different = distances[i].findIndex(
			(v, j) => v !== distances[closest][j],
		);
		if (
			different >= 0 &&
			distances[i][different] < distances[closest][different]
		)
			closest = i;
	}
	return closest;
}

function squareRoot(n: bigint): bigint {
	if (n < 2n) return n;
	let root = 1n << BigInt(Math.ceil(n.toString(2).length / 2));
	while (true) {
		const next = (root + n / root) / 2n;
		if (next >= root) return root;
		root = next;
	}
}

function crossingTimes(a: bigint, b: bigint, c: bigint): bigint[] | undefined {
	if (a === 0n) {
		if (b === 0n) return c === 0n ? undefined : [];
		return -c % b === 0n && -c / b >= 0n ? [-c / b] : [];
	}
	const discriminant = b * b - 4n * a * c;
	if (discriminant < 0n) return [];
	const root = squareRoot(discriminant);
	if (root * root !== discriminant) return [];
	const divisor = 2n * a;
	return [...new Set([-b - root, -b + root])]
		.filter((v) => v % divisor === 0n && v / divisor >= 0n)
		.map((v) => v / divisor);
}

function collisionTime(first: Particle, second: Particle): bigint | undefined {
	let common: bigint[] | undefined;
	for (let i = 0; i < 3; i++) {
		const [a, b, c] = first[i];
		const times = crossingTimes(
			a - second[i][0],
			b - second[i][1],
			c - second[i][2],
		);
		if (times === undefined) continue;
		common =
			common === undefined ? times : common.filter((t) => times.includes(t));
		if (common.length === 0) return undefined;
	}
	if (!common) return 0n;
	return common.reduce((a, b) => (a < b ? a : b));
}

export function part2(input: string): number {
	const particles = parse(input);
	const collisions = new Map<bigint, [number, number][]>();
	for (let i = 0; i < particles.length; i++) {
		for (let j = i + 1; j < particles.length; j++) {
			const time = collisionTime(particles[i], particles[j]);
			if (time === undefined) continue;
			const atTime = collisions.get(time);
			if (atTime) atTime.push([i, j]);
			else collisions.set(time, [[i, j]]);
		}
	}
	const destroyed = new Set<number>();
	for (const [, pairs] of [...collisions].sort(([a], [b]) =>
		a < b ? -1 : 1,
	)) {
		const simultaneous = new Set<number>();
		for (const [i, j] of pairs) {
			if (destroyed.has(i) || destroyed.has(j)) continue;
			simultaneous.add(i);
			simultaneous.add(j);
		}
		for (const i of simultaneous) destroyed.add(i);
	}
	return particles.length - destroyed.size;
}

if (import.meta.main) run(import.meta.url, part1, part2);
