import { run } from "../../../scripts/aoc.ts";

type Cuboid = [number, number, number, number, number, number];

function intersection(a: Cuboid, b: Cuboid): Cuboid | undefined {
	const overlap: Cuboid = [
		Math.max(a[0], b[0]),
		Math.min(a[1], b[1]),
		Math.max(a[2], b[2]),
		Math.min(a[3], b[3]),
		Math.max(a[4], b[4]),
		Math.min(a[5], b[5]),
	];
	if (
		overlap[0] <= overlap[1] &&
		overlap[2] <= overlap[3] &&
		overlap[4] <= overlap[5]
	)
		return overlap;
}

function subtract(box: Cuboid, cut: Cuboid): Cuboid[] {
	const overlap = intersection(box, cut);
	if (!overlap) return [box];
	const core: Cuboid = [...box];
	const pieces: Cuboid[] = [];
	for (const low of [0, 2, 4]) {
		const high = low + 1;
		if (core[low] < overlap[low]) {
			const slice: Cuboid = [...core];
			slice[high] = overlap[low] - 1;
			pieces.push(slice);
			core[low] = overlap[low];
		}
		if (core[high] > overlap[high]) {
			const slice: Cuboid = [...core];
			slice[low] = overlap[high] + 1;
			pieces.push(slice);
			core[high] = overlap[high];
		}
	}
	return pieces;
}

function reboot(input: string, limit?: Cuboid) {
	let active: Cuboid[] = [];
	for (const line of input.trim().split(/\r?\n/)) {
		const bounds = line.match(/-?\d+/g)!.map(Number) as Cuboid;
		const box = limit ? intersection(bounds, limit) : bounds;
		if (!box) continue;
		active = active.flatMap((piece) => subtract(piece, box));
		if (line.startsWith("on")) active.push(box);
	}
	const volume = active.reduce(
		(sum, [x1, x2, y1, y2, z1, z2]) =>
			sum + BigInt(x2 - x1 + 1) * BigInt(y2 - y1 + 1) * BigInt(z2 - z1 + 1),
		0n,
	);
	return volume <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(volume) : volume;
}

export function part1(input: string) {
	return reboot(input, [-50, 50, -50, 50, -50, 50]);
}
export function part2(input: string) {
	return reboot(input);
}

if (import.meta.main) run(import.meta.url, part1, part2);
