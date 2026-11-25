import { run } from "../../../scripts/aoc.ts";

function bestSquare(input: string, minSize: number, maxSize: number) {
	const serial = Number(input.trim());
	const stride = 301;
	const totals = new Int32Array(stride * stride);
	for (let y = 1; y < stride; y++) {
		let rowSum = 0;
		for (let x = 1; x < stride; x++) {
			const rack = x + 10;
			rowSum += (Math.floor(((rack * y + serial) * rack) / 100) % 10) - 5;
			totals[y * stride + x] = totals[(y - 1) * stride + x] + rowSum;
		}
	}
	let best = -Infinity;
	let result = { x: 0, y: 0, size: 0 };
	for (let size = minSize; size <= maxSize; size++) {
		for (let y = size; y < stride; y++) {
			for (let x = size; x < stride; x++) {
				const bottom = y * stride + x;
				const top = bottom - size * stride;
				const sum =
					totals[bottom] -
					totals[bottom - size] -
					totals[top] +
					totals[top - size];
				if (sum > best) {
					best = sum;
					result = { x: x - size + 1, y: y - size + 1, size };
				}
			}
		}
	}
	return result;
}

export function part1(input: string): string {
	const { x, y } = bestSquare(input, 3, 3);
	return [x, y].join(",");
}

export function part2(input: string): string {
	const { x, y, size } = bestSquare(input, 1, 300);
	return [x, y, size].join(",");
}

if (import.meta.main) run(import.meta.url, part1, part2);
