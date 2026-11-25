import { run } from "../../../scripts/aoc.ts";

type Stone = { p: bigint[]; v: bigint[] };
function parse(input: string): Stone[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [p, v] = line
				.split("@")
				.map((vector) => vector.split(",").map(BigInt));
			return { p, v };
		});
}

export function part1(
	input: string,
	min = 200_000_000_000_000,
	max = 400_000_000_000_000,
): number {
	const stones = parse(input);
	let count = 0;
	for (const [i, a] of stones.entries())
		for (const b of stones.slice(i + 1)) {
			const dx = b.p[0] - a.p[0],
				dy = b.p[1] - a.p[1];
			const denominator = a.v[0] * b.v[1] - a.v[1] * b.v[0];
			if (!denominator) continue;
			const sign = denominator < 0n ? -1n : 1n;
			const timeA = sign * (dx * b.v[1] - dy * b.v[0]);
			const timeB = sign * (dx * a.v[1] - dy * a.v[0]);
			if (timeA < 0n || timeB < 0n) continue;
			const scale = denominator * sign;
			const x = a.p[0] * scale + timeA * a.v[0],
				y = a.p[1] * scale + timeA * a.v[1];
			if (
				x >= BigInt(min) * scale &&
				x <= BigInt(max) * scale &&
				y >= BigInt(min) * scale &&
				y <= BigInt(max) * scale
			)
				count++;
		}
	return count;
}

const difference = (a: bigint[], b: bigint[]) => a.map((v, i) => v - b[i]);
function cross(a: bigint[], b: bigint[]) {
	return a.map(
		(_, i) => a[(i + 1) % 3] * b[(i + 2) % 3] - a[(i + 2) % 3] * b[(i + 1) % 3],
	);
}
function gcd(a: bigint, b: bigint): bigint {
	while (b) [a, b] = [b, a % b];
	return a < 0n ? -a : a;
}

function* collisionEquations(stones: Stone[]) {
	const first = stones[0];
	for (const stone of stones.slice(1)) {
		const [x, y, z] = difference(stone.p, first.p),
			[u, v, w] = difference(stone.v, first.v);
		const rhs = difference(cross(stone.p, stone.v), cross(first.p, first.v));
		yield [0n, w, -v, 0n, -z, y, rhs[0]];
		yield [-w, 0n, u, z, 0n, -x, rhs[1]];
		yield [v, -u, 0n, -y, x, 0n, rhs[2]];
	}
}

export function part2(input: string): bigint {
	const stones = parse(input);
	const basis = new Map<number, bigint[]>();
	for (let row of collisionEquations(stones)) {
		for (let column = 0; column < 6; column++) {
			if (!row[column]) continue;
			const pivot = basis.get(column);
			if (!pivot) {
				basis.set(column, row);
				break;
			}
			const factor = row[column];
			row = row.map((value, i) => value * pivot[column] - factor * pivot[i]);
			const divisor = row.reduce(gcd);
			if (divisor > 1n) row = row.map((n) => n / divisor);
		}
		if (basis.size === 6) break;
	}
	if (basis.size !== 6)
		throw new Error("The trajectories do not determine a unique rock");
	const rock: bigint[] = new Array(6).fill(0n);
	for (let i = 5; i >= 0; i--) {
		const row = basis.get(i)!;
		let rhs = row[6];
		for (let j = i + 1; j < 6; j++) rhs -= row[j] * rock[j];
		if (rhs % row[i] !== 0n) throw new Error("Nonintegral rock trajectory");
		rock[i] = rhs / row[i];
	}
	for (const stone of stones) {
		const distance = difference(stone.p, rock),
			velocity = difference(rock.slice(3), stone.v);
		const axis = velocity.findIndex((v) => v !== 0n);
		if (
			axis === -1
				? distance.some((v) => v !== 0n)
				: distance[axis] * velocity[axis] < 0n ||
					distance.some(
						(n, i) => n * velocity[axis] !== distance[axis] * velocity[i],
					)
		)
			throw new Error("The rock misses a hailstone");
	}
	return rock[0] + rock[1] + rock[2];
}

if (import.meta.main) run(import.meta.url, part1, part2);
