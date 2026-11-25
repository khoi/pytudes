import { run } from "../../../scripts/aoc.ts";

function claims(input: string) {
	return input
		.trim()
		.split("\n")
		.map((line) => {
			const [id, left, top, width, height] = line.match(/\d+/g)!.map(Number);
			return { id, left, top, right: left + width, bottom: top + height };
		});
}

export function part1(input: string): number {
	const rectangles = claims(input);
	const stride = Math.max(...rectangles.map((claim) => claim.right));
	const rows = Math.max(...rectangles.map((claim) => claim.bottom));
	const layers = new Uint32Array(stride * rows);
	let overlap = 0;
	for (const { left, top, right, bottom } of rectangles) {
		for (let y = top; y < bottom; y++) {
			for (let x = left; x < right; x++) {
				if (++layers[y * stride + x] === 2) overlap++;
			}
		}
	}
	return overlap;
}

export function part2(input: string): number {
	const rectangles = claims(input);
	const intact = rectangles.find(
		(claim) =>
			!rectangles.some(
				(other) =>
					other !== claim &&
					claim.left < other.right &&
					other.left < claim.right &&
					claim.top < other.bottom &&
					other.top < claim.bottom,
			),
	);
	if (!intact) throw new Error("Every claim overlaps");
	return intact.id;
}

if (import.meta.main) run(import.meta.url, part1, part2);
