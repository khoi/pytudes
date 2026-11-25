import { run } from "../../../scripts/aoc.ts";

function gcdCoefficients(a: number, b: number): [number, number, number] {
	if (b === 0) return [a, 1, 0];
	const [g, x, y] = gcdCoefficients(b, a % b);
	return [g, y, x - Math.floor(a / b) * y];
}

function parallelCost(
	a: number,
	b: number,
	prize: number,
	limit: number,
): number {
	const [g, x, y] = gcdCoefficients(a, b);
	if (!g || prize % g) return 0;
	if (a === 0 || b === 0) {
		const presses = prize / (a || b);
		return presses <= limit ? presses * (a ? 3 : 1) : 0;
	}
	const startA = x * (prize / g);
	const startB = y * (prize / g);
	const stepA = b / g;
	const stepB = a / g;
	const min = Math.max(
		Math.ceil(-startA / stepA),
		Math.ceil((startB - limit) / stepB),
	);
	const max = Math.min(
		Math.floor((limit - startA) / stepA),
		Math.floor(startB / stepB),
	);
	if (min > max) return 0;
	const k = 3 * stepA >= stepB ? min : max;
	return 3 * (startA + stepA * k) + startB - stepB * k;
}

function tokens(input: string, offset: number, limit: number): number {
	let total = 0;
	for (const machine of input.trim().split(/\r?\n\s*\n/)) {
		const [ax, ay, bx, by, x, y] = machine.match(/\d+/g)!.map(Number);
		const px = x + offset;
		const py = y + offset;
		const determinant = ax * by - bx * ay;
		if (determinant === 0) {
			if (ax * py === ay * px && bx * py === by * px) {
				total +=
					ax || bx
						? parallelCost(ax, bx, px, limit)
						: parallelCost(ay, by, py, limit);
			}
			continue;
		}
		const a = (px * by - py * bx) / determinant;
		const b = (ax * py - ay * px) / determinant;
		if (
			Number.isInteger(a) &&
			Number.isInteger(b) &&
			a >= 0 &&
			b >= 0 &&
			a <= limit &&
			b <= limit
		)
			total += 3 * a + b;
	}
	return total;
}

export function part1(input: string) {
	return tokens(input, 0, 100);
}
export function part2(input: string) {
	return tokens(input, 10_000_000_000_000, Infinity);
}

if (import.meta.main) run(import.meta.url, part1, part2);
