import { run } from "../../../scripts/aoc.ts";

type Point = [number, number];
type Orientation = { width: number; height: number; cells: Point[] };
type Shape = { area: number; size: number; variants: Orientation[] };

function shape(rows: string[]): Shape {
	const points: Point[] = rows.flatMap((row, y) =>
		[...row].flatMap((cell, x): Point[] => (cell === "#" ? [[x, y]] : [])),
	);
	const variants = new Map<string, Orientation>();
	for (const reflect of [1, -1]) {
		let rotated: Point[] = points.map(([x, y]) => [x * reflect, y]);
		for (let turn = 0; turn < 4; turn++) {
			const left = Math.min(...rotated.map(([x]) => x));
			const top = Math.min(...rotated.map(([, y]) => y));
			const cells: Point[] = rotated.map(([x, y]) => [x - left, y - top]);
			cells.sort(([x1, y1], [x2, y2]) => y1 - y2 || x1 - x2);
			const width = 1 + Math.max(...cells.map(([x]) => x));
			const height = 1 + Math.max(...cells.map(([, y]) => y));
			variants.set(JSON.stringify(cells), { width, height, cells });
			rotated = rotated.map(([x, y]) => [-y, x]);
		}
	}
	const orientations = [...variants.values()];
	return {
		area: points.length,
		size: Math.max(orientations[0].width, orientations[0].height),
		variants: orientations,
	};
}

function placements(piece: Shape, width: number, height: number) {
	const masks: bigint[] = [];
	for (const variant of piece.variants) {
		if (variant.width > width || variant.height > height) continue;
		const mask = variant.cells.reduce(
			(bits, [x, y]) => bits | (1n << BigInt(y * width + x)),
			0n,
		);
		for (let y = 0; y <= height - variant.height; y++) {
			for (let x = 0; x <= width - variant.width; x++) {
				masks.push(mask << BigInt(y * width + x));
			}
		}
	}
	return masks;
}

function canFit(
	shapes: Shape[],
	counts: number[],
	width: number,
	height: number,
) {
	const needed = shapes
		.map((piece, i) => ({ piece, count: counts[i] }))
		.filter(({ count }) => count > 0);
	if (needed.length === 0) return true;
	const area = needed.reduce(
		(sum, { piece, count }) => sum + piece.area * count,
		0,
	);
	if (area > width * height) return false;
	const block = Math.max(...needed.map(({ piece }) => piece.size));
	const pieces = needed.reduce((sum, { count }) => sum + count, 0);
	if (pieces <= Math.floor(width / block) * Math.floor(height / block))
		return true;

	const groups = needed.map(({ piece, count }) => ({
		masks: placements(piece, width, height),
		count,
	}));
	groups.sort((a, b) => a.masks.length / a.count - b.masks.length / b.count);

	function pack(
		group: number,
		remaining: number,
		first: number,
		occupied: bigint,
	): boolean {
		if (remaining === 0) {
			const next = group + 1;
			return (
				next === groups.length || pack(next, groups[next].count, 0, occupied)
			);
		}
		const { masks } = groups[group];
		for (let i = first; i <= masks.length - remaining; i++) {
			const mask = masks[i];
			if (
				(occupied & mask) === 0n &&
				pack(group, remaining - 1, i + 1, occupied | mask)
			)
				return true;
		}
		return false;
	}
	return pack(0, groups[0].count, 0, 0n);
}

export function part1(input: string): number {
	const blocks = input.trim().split(/\r?\n\s*\n/);
	const regions = blocks.pop()!.split(/\r?\n/);
	const shapes: Shape[] = [];
	for (const block of blocks) {
		const [id, ...rows] = block.split(/\r?\n/);
		shapes[Number.parseInt(id, 10)] = shape(rows);
	}
	let total = 0;
	for (const region of regions) {
		const [width, height, ...counts] = region.match(/\d+/g)!.map(Number);
		if (canFit(shapes, counts, width, height)) total++;
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1);
